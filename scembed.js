(function () {
    var qs = parseQueryStringFromHash();
    var debug = qs.d === '1';
    findAndInitBookingSummary();

    function findAndInitBookingSummary() {
        var container = document.querySelector('.sc-summary-container:not(.sc-initialised)');
        if (container) {
            initBookingSummary(container);
        }
        setTimeout(findAndInitBookingSummary, 500); // watch for changes
    }

    function initBookingSummary(container) {
        container.classList.add('sc-initialised');
        var apiDomain = container.dataset.apiDomain || 'https://api.supercontrol.co.uk';

        if (qs.k) {
            container.classList.add('sc-loading');
            container.innerHTML = '<b> Please wait while the booking summary is loading...</b>';

            var summaryUrl = apiDomain + '/v3/cart/summary/' + qs.k;

            if (window.fetch) {
                // Modern browsers - send request asynchronously, handle errors gracefully
                fetch(summaryUrl)
                    .then(function (response) {
                        return response.ok
                            ? response.json()
                            : response.json().then(Promise.reject.bind(Promise));
                    })
                    .then(processSummaryJson)
                    .catch(handleError);
            } else {
                // IE - fallback; it's sync so may block the main thread and be slower
                try {
                    var response = httpGet(summaryUrl);
                    var data = JSON.parse(response);
                    if (data.summaryHtml) {
                        processSummaryJson(data);
                    } else {
                        handleError(data);
                    }
                } catch (error) {
                    handleError(error);
                }
            }
        } else {
            container.classList.add('sc-error');
            showError('Booking summary was not found.');
        }

        function showError(msg) {
            container.innerHTML = '<span>Sorry, there\'s been an error: \n\n ' + msg + '</span>';
        }

        function handleError(error) {
            container.classList.add('sc-error');
            showError(error);
            console.error(error);
        }

        function processSummaryJson(data) {
            container.classList.remove('sc-loading');
            container.classList.add('sc-loaded');
            container.innerHTML = data.summaryHtml;

            if (data.sendTrackingData || debug) {
                // GA4
                gaEvent({
                    'event': 'purchase',
                    'ecommerce': {
                        'transaction_id': data.ownerBookingId,
                        'affiliation': data.propertyGroupName,
                        'value': data.bookingTotal,
                        'currency': data.ownerCurrency,
                        'coupon': data.voucherCode,
                        'items': [{
                            'item_id': data.propertyId,
                            'item_name': data.propertyName,
                            'affiliation': data.propertyGroupName,
                            'coupon': data.voucherCode,
                            'currency': data.ownerCurrency,
                            'price': data.bookingTotal,
                            'quantity': 1,
                            'start_date': data.bookingArrival,
                            'nights': data.bookingNights,
                            'adults': data.bookingAdults,
                            'children': data.bookingChildren,
                            'infants': data.bookingInfants
                        }]
                    }
                });

                // GA3
                gaEvent({
                    'event': 'GA3_Purchase',
                    'ecommerce': {
                        'purchase': {
                            'actionField': {
                                'id': data.ownerBookingId,
                                'affiliation': data.propertyGroupName,
                                'revenue': data.bookingTotal,
                                'coupon': data.voucherCode
                            },
                            'products': [{
                                'name': data.propertyName + ' - N:' + data.bookingNights + ' - A:' + data.bookingAdults + ' - C:' + data.bookingChildren + ' - I:' + data.bookingInfants,
                                'id': data.propertyId,
                                'price': data.bookingTotal,
                                'quantity': 1
                            }]
                        }
                    }
                });

                // Facebook
                gaEvent({
                    'event': 'fbq',
                    'facebook_event_type': 'track',
                    'facebook_event_name': 'Purchase',
                    'facebook_data': {
                        'value': data.bookingTotal,
                        'currency': data.ownerCurrency,
                        'content_type': 'product',
                        'contents': [{
                            'id': data.propertyId,
                            'item_price': data.bookingTotal,
                            'quantity': 1
                        }]
                    }
                });

                // Google Ads
                gaEvent({
                    'event': 'purchase',
                    'purchase_type': 'ADS',
                    'transaction_id': data.ownerBookingId,
                    'value': data.bookingTotal,
                    'currency': data.ownerCurrency,
                    'items': [{
                        'id': data.propertyId,
                        'price': data.bookingTotal,
                        'quantity': 1
                    }]
                });
            }

            // send booking data to use by client's site
            setTimeout(function() {
                var event = CreateCustomEvent("sc-summary-booking-info", data);
                document.dispatchEvent(event);
            }, 0);
        }
    }

    function gaEvent(event) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({ ecommerce: null }); // required by GTM to "reset" the queue
        if (debug) {
            console.log("gaEvent", event);
        }
        return window.dataLayer.push(event);
    }

    function parseQueryStringFromHash() {
        var hash = window.location.hash.substring(1);
        var props = hash.split('&');
        var qs = props.reduce(function (prev, cur) {
            var s = cur.split('=', 2);
            prev[s[0]] = s[1];
            return prev;
        }, {});

        return qs;
    }

    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    function CreateCustomEvent(name, data) {
        if (typeof window.CustomEvent === 'function') {
            return new CustomEvent(name, { detail: data });
        } else {
            // IE - CustomEvent constructor not available
            var event = document.createEvent('CustomEvent');
            event.initCustomEvent(name, false, false, data);
            return event;
        }
    }
})();