!function(a){"use strict";function b(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function c(a,b,c){"addEventListener"in window?a.addEventListener(b,c,!1):"attachEvent"in window&&a.attachEvent("on"+b,c)}function d(a,b,c){"removeEventListener"in window?a.removeEventListener(b,c,!1):"detachEvent"in window&&a.detachEvent("on"+b,c)}function e(){var a,b=["moz","webkit","o","ms"];for(a=0;a<b.length&&!Q;a+=1)Q=window[b[a]+"RequestAnimationFrame"];Q||i("setup","RequestAnimationFrame not supported")}function f(a){var b="Host page: "+a;return window.top!==window.self&&(b=window.parentIFrame&&window.parentIFrame.getId?window.parentIFrame.getId()+": "+a:"Nested host page: "+a),b}function g(a){return N+"["+f(a)+"]"}function h(a){return S[a]?S[a].log:J}function i(a,b){l("log",a,b,h(a))}function j(a,b){l("info",a,b,h(a))}function k(a,b){l("warn",a,b,!0)}function l(a,b,c,d){!0===d&&"object"==typeof window.console&&console[a](g(b),c)}function m(a){function b(){function a(){u(T),r(V),I("resizedCallback",T)}f("Height"),f("Width"),v(a,T,"init")}function e(){var a=R.substr(O).split(":");return{iframe:S[a[0]]&&S[a[0]].iframe,id:a[0],height:a[1],width:a[2],type:a[3]}}function f(a){var b=Number(S[V]["max"+a]),c=Number(S[V]["min"+a]),d=a.toLowerCase(),e=Number(T[d]);i(V,"Checking "+d+" is in range "+c+"-"+b),e<c&&(e=c,i(V,"Set "+d+" to min value")),e>b&&(e=b,i(V,"Set "+d+" to max value")),T[d]=""+e}function g(){function b(){function a(){var a=0,b=!1;for(i(V,"Checking connection is from allowed list of origins: "+d);a<d.length;a++)if(d[a]===c){b=!0;break}return b}function b(){var a=S[V]&&S[V].remoteHost;return i(V,"Checking connection is from: "+a),c===a}return d.constructor===Array?a():b()}var c=a.origin,d=S[V]&&S[V].checkOrigin;if(d&&""+c!="null"&&!b())throw new Error("Unexpected message received from: "+c+" for "+T.iframe.id+". Message was: "+a.data+". This error can be disabled by setting the checkOrigin: false option or by providing of array of trusted domains.");return!0}function h(){return N===(""+R).substr(0,O)&&R.substr(O).split(":")[0]in S}function l(){var a=T.type in{true:1,false:1,undefined:1};return a&&i(V,"Ignoring init message from meta parent page"),a}function m(a){return R.substr(R.indexOf(":")+M+a)}function o(a){i(V,"MessageCallback passed: {iframe: "+T.iframe.id+", message: "+a+"}"),I("messageCallback",{iframe:T.iframe,message:JSON.parse(a)}),i(V,"--")}function y(){var a=document.body.getBoundingClientRect(),b=T.iframe.getBoundingClientRect();return JSON.stringify({iframeHeight:b.height,iframeWidth:b.width,clientHeight:Math.max(document.documentElement.clientHeight,window.innerHeight||0),clientWidth:Math.max(document.documentElement.clientWidth,window.innerWidth||0),offsetTop:parseInt(b.top-a.top,10),offsetLeft:parseInt(b.left-a.left,10),scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset})}function z(a,b){function c(){w("Send Page Info","pageInfo:"+y(),a,b)}A(c,32,b)}function B(){function a(a,c){function d(){S[f]?z(S[f].iframe,f):b()}["scroll","resize"].forEach(function(b){i(f,a+b+" listener for sendPageInfo"),c(window,b,d)})}function b(){a("Remove ",d)}function e(){a("Add ",c)}var f=V;e(),S[f]&&(S[f].stopPageInfo=b)}function C(){S[V]&&S[V].stopPageInfo&&(S[V].stopPageInfo(),delete S[V].stopPageInfo)}function D(){var a=!0;return null===T.iframe&&(k(V,"IFrame ("+T.id+") not found"),a=!1),a}function E(a){var b=a.getBoundingClientRect();return q(V),{x:Math.floor(Number(b.left)+Number(P.x)),y:Math.floor(Number(b.top)+Number(P.y))}}function F(a){function b(){P=f,G(),i(V,"--")}function c(){return{x:Number(T.width)+e.x,y:Number(T.height)+e.y}}function d(){window.parentIFrame?window.parentIFrame["scrollTo"+(a?"Offset":"")](f.x,f.y):k(V,"Unable to scroll to requested position, window.parentIFrame not found")}var e=a?E(T.iframe):{x:0,y:0},f=c();i(V,"Reposition requested from iFrame (offset x:"+e.x+" y:"+e.y+")"),window.top!==window.self?d():b()}function G(){!1!==I("scrollCallback",P)?r(V):s()}function H(a){function b(){var a=E(f);i(V,"Moving to in page link (#"+d+") at x: "+a.x+" y: "+a.y),P={x:a.x,y:a.y},G(),i(V,"--")}function c(){window.parentIFrame?window.parentIFrame.moveToAnchor(d):i(V,"In page link #"+d+" not found and window.parentIFrame not found")}var d=a.split("#")[1]||"",e=decodeURIComponent(d),f=document.getElementById(e)||document.getElementsByName(e)[0];f?b():window.top!==window.self?c():i(V,"In page link #"+d+" not found")}function I(a,b){return n(V,a,b)}function J(){switch(S[V]&&S[V].firstRun&&Q(),T.type){case"close":S[V].closeRequestCallback?n(V,"closeRequestCallback",S[V].iframe):p(T.iframe);break;case"message":o(m(6));break;case"scrollTo":F(!1);break;case"scrollToOffset":F(!0);break;case"pageInfo":z(S[V]&&S[V].iframe,V),B();break;case"pageInfoStop":C();break;case"inPageLink":H(m(9));break;case"reset":t(T);break;case"init":b(),I("initCallback",T.iframe);break;default:b()}}function K(a){var b=!0;return S[a]||(b=!1,k(T.type+" No settings for "+a+". Message was: "+R)),b}function L(){for(var a in S)w("iFrame requested init",x(a),document.getElementById(a),a)}function Q(){S[V]&&(S[V].firstRun=!1)}var R=a.data,T={},V=null;"[iFrameResizerChild]Ready"===R?L():h()?(T=e(),V=U=T.id,S[V]&&(S[V].loaded=!0),!l()&&K(V)&&(i(V,"Received: "+R),D()&&g()&&J())):j(V,"Ignored: "+R)}function n(a,b,c){var d=null,e=null;if(S[a]){if("function"!=typeof(d=S[a][b]))throw new TypeError(b+" on iFrame["+a+"] is not a function");e=d(c)}return e}function o(a){var b=a.id;delete S[b]}function p(a){var b=a.id;i(b,"Removing iFrame: "+b);try{a.parentNode&&a.parentNode.removeChild(a)}catch(c){}n(b,"closedCallback",b),i(b,"--"),o(a)}function q(b){null===P&&(P={x:window.pageXOffset!==a?window.pageXOffset:document.documentElement.scrollLeft,y:window.pageYOffset!==a?window.pageYOffset:document.documentElement.scrollTop},i(b,"Get page position: "+P.x+","+P.y))}function r(a){null!==P&&(window.scrollTo(P.x,P.y),i(a,"Set page position: "+P.x+","+P.y),s())}function s(){P=null}function t(a){function b(){u(a),w("reset","reset",a.iframe,a.id)}i(a.id,"Size reset requested by "+("init"===a.type?"host page":"iFrame")),q(a.id),v(b,a,"reset")}function u(a){function b(b){if(!a.id)return void i("undefined","messageData id not set");a.iframe.style[b]=a[b]+"px",i(a.id,"IFrame ("+e+") "+b+" set to "+a[b]+"px")}function c(b){K||"0"!==a[b]||(K=!0,i(e,"Hidden iFrame detected, creating visibility listener"),B())}function d(a){b(a),c(a)}var e=a.iframe.id;S[e]&&(S[e].sizeHeight&&d("height"),S[e].sizeWidth&&d("width"))}function v(a,b,c){c!==b.type&&Q?(i(b.id,"Requesting animation frame"),Q(a)):a()}function w(a,b,c,d,e){function f(){var e=S[d]&&S[d].targetOrigin;i(d,"["+a+"] Sending msg to iframe["+d+"] ("+b+") targetOrigin: "+e),c.contentWindow.postMessage(N+b,e)}function g(){k(d,"["+a+"] IFrame("+d+") not found")}function h(){c&&"contentWindow"in c&&null!==c.contentWindow?f():g()}function j(){function a(){!S[d]||S[d].loaded||l||(l=!0,k(d,"IFrame has not responded within "+S[d].warningTimeout/1e3+" seconds. Check iFrameResizer.contentWindow.js has been loaded in iFrame. This message can be ignored if everything is working, or you can set the warningTimeout option to a higher value or zero to suppress this warning."))}e&&S[d]&&S[d].warningTimeout&&(S[d].msgTimeout=setTimeout(a,S[d].warningTimeout))}var l=!1;d=d||c.id,S[d]&&(h(),j())}function x(a){return a+":"+S[a].bodyMarginV1+":"+S[a].sizeWidth+":"+S[a].log+":"+S[a].interval+":"+S[a].enablePublicMethods+":"+S[a].autoResize+":"+S[a].bodyMargin+":"+S[a].heightCalculationMethod+":"+S[a].bodyBackground+":"+S[a].bodyPadding+":"+S[a].tolerance+":"+S[a].inPageLinks+":"+S[a].resizeFrom+":"+S[a].widthCalculationMethod}function y(d,e){function f(){function a(a){1/0!==S[z][a]&&0!==S[z][a]&&(d.style[a]=S[z][a]+"px",i(z,"Set "+a+" = "+S[z][a]+"px"))}function b(a){if(S[z]["min"+a]>S[z]["max"+a])throw new Error("Value for min"+a+" can not be greater than max"+a)}b("Height"),b("Width"),a("maxHeight"),a("minHeight"),a("maxWidth"),a("minWidth")}function g(){var a=e&&e.id||V.id+I++;return null!==document.getElementById(a)&&(a+=I++),a}function h(a){return U=a,""===a&&(d.id=a=g(),J=(e||{}).log,U=a,i(a,"Added missing iframe ID: "+a+" ("+d.src+")")),a}function j(){switch(i(z,"IFrame scrolling "+(S[z]&&S[z].scrolling?"enabled":"disabled")+" for "+z),d.style.overflow=!1===(S[z]&&S[z].scrolling)?"hidden":"auto",S[z]&&S[z].scrolling){case"omit":break;case!0:d.scrolling="yes";break;case!1:d.scrolling="yes";break;default:d.scrolling=S[z]?S[z].scrolling:"no"}}function l(){"number"!=typeof(S[z]&&S[z].bodyMargin)&&"0"!==(S[z]&&S[z].bodyMargin)||(S[z].bodyMarginV1=S[z].bodyMargin,S[z].bodyMargin=S[z].bodyMargin+"px")}function m(){var a=S[z]&&S[z].firstRun,b=S[z]&&S[z].heightCalculationMethod in R;!a&&b&&t({iframe:d,height:0,width:0,type:"init"})}function n(){Function.prototype.bind&&S[z]&&(S[z].iframe.iFrameResizer={close:p.bind(null,S[z].iframe),removeListeners:o.bind(null,S[z].iframe),resize:w.bind(null,"Window resize","resize",S[z].iframe),moveToAnchor:function(a){w("Move to anchor","moveToAnchor:"+a,S[z].iframe,z)},sendMessage:function(a){a=JSON.stringify(a),w("Send Message","message:"+a,S[z].iframe,z)}})}function q(e){function f(){w("iFrame.onload",e,d,a,!0),m()}function g(a){if(d.parentNode){new a(function(a){a.forEach(function(a){Array.prototype.slice.call(a.removedNodes).forEach(function(a){a===d&&p(d)})})}).observe(d.parentNode,{childList:!0})}}var h=b();h&&g(h),c(d,"load",f),w("init",e,d,a,!0)}function r(a){if("object"!=typeof a)throw new TypeError("Options is not an object")}function s(a){for(var b in V)V.hasOwnProperty(b)&&(S[z][b]=a.hasOwnProperty(b)?a[b]:V[b])}function u(a){return""===a||"file://"===a?"*":a}function v(a){a=a||{},S[z]={firstRun:!0,iframe:d,remoteHost:d.src.split("/").slice(0,3).join("/")},r(a),s(a),S[z]&&(S[z].targetOrigin=!0===S[z].checkOrigin?u(S[z].remoteHost):"*")}function y(){return z in S&&"iFrameResizer"in d}var z=h(d.id);y()?k(z,"Ignored iFrame, already setup."):(v(e),j(),f(),l(),q(x(z)),n())}function z(a,b){null===T&&(T=setTimeout(function(){T=null,a()},b))}function A(a,b,c){W[c]||(W[c]=setTimeout(function(){W[c]=null,a()},b))}function B(){function a(){function a(a){function b(b){return"0px"===(S[a]&&S[a].iframe.style[b])}function c(a){return null!==a.offsetParent}S[a]&&c(S[a].iframe)&&(b("height")||b("width"))&&w("Visibility change","resize",S[a].iframe,a)}for(var b in S)a(b)}function c(b){i("window","Mutation observed: "+b[0].target+" "+b[0].type),z(a,16)}function d(){var a=document.querySelector("body"),b={attributes:!0,attributeOldValue:!1,characterData:!0,characterDataOldValue:!1,childList:!0,subtree:!0};new e(c).observe(a,b)}var e=b();e&&d()}function C(a){function b(){E("Window "+a,"resize")}i("window","Trigger event: "+a),z(b,16)}function D(){function a(){E("Tab Visable","resize")}"hidden"!==document.visibilityState&&(i("document","Trigger event: Visiblity change"),z(a,16))}function E(a,b){function c(a){return S[a]&&"parent"===S[a].resizeFrom&&S[a].autoResize&&!S[a].firstRun}for(var d in S)c(d)&&w(a,b,document.getElementById(d),d)}function F(){c(window,"message",m),c(window,"resize",function(){C("resize")}),c(document,"visibilitychange",D),c(document,"-webkit-visibilitychange",D),c(window,"focusin",function(){C("focus")}),c(window,"focus",function(){C("focus")})}function G(){function b(a,b){function c(){if(!b.tagName)throw new TypeError("Object is not a valid DOM element");if("IFRAME"!==b.tagName.toUpperCase())throw new TypeError("Expected <IFRAME> tag, found <"+b.tagName+">")}b&&(c(),y(b,a),d.push(b))}function c(a){a&&a.enablePublicMethods&&k("enablePublicMethods option has been removed, public methods are now always available in the iFrame")}var d;return e(),F(),function(e,f){switch(d=[],c(e),typeof f){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(f||"iframe"),b.bind(a,e));break;case"object":b(e,f);break;default:throw new TypeError("Unexpected data type ("+typeof f+")")}return d}}function H(a){a.fn?a.fn.iFrameResize||(a.fn.iFrameResize=function(a){function b(b,c){y(c,a)}return this.filter("iframe").each(b).end()}):j("","Unable to bind to jQuery, it is not fully loaded.")}if("undefined"!=typeof window){var I=0,J=!1,K=!1,L="message",M=L.length,N="[iFrameSizer]",O=N.length,P=null,Q=window.requestAnimationFrame,R={max:1,scroll:1,bodyScroll:1,documentElementScroll:1},S={},T=null,U="Host Page",V={autoResize:!0,bodyBackground:null,bodyMargin:null,bodyMarginV1:8,bodyPadding:null,checkOrigin:!0,inPageLinks:!1,enablePublicMethods:!0,heightCalculationMethod:"bodyOffset",id:"iFrameResizer",interval:32,log:!1,maxHeight:1/0,maxWidth:1/0,minHeight:0,minWidth:0,resizeFrom:"parent",scrolling:!1,sizeHeight:!0,sizeWidth:!1,warningTimeout:5e3,tolerance:0,widthCalculationMethod:"scroll",closedCallback:function(){},initCallback:function(){},messageCallback:function(){k("MessageCallback function not defined")},resizedCallback:function(){},scrollCallback:function(){return!0}},W={};window.jQuery&&H(window.jQuery),"function"==typeof define&&define.amd?define([],G):"object"==typeof module&&"object"==typeof module.exports&&(module.exports=G()),window.iFrameResize=window.iFrameResize||G()}}();

var superControlCalendarWidgetManualBootstrap;

window.addEventListener("load", function() {


(superControlCalendarWidgetManualBootstrap = function(){

    if(window.location.hash === '#calendarPopup'){
        if(!historyNoAccess){
            history.replaceState({},'', window.location.href.replace('#calendarPopup',''));
        }
    }
    
    const widgetSelector = document.querySelectorAll('[data-calendar-key]')

    if(widgetSelector.length == 0){
        return;
    }

    var pickerFrames = []

    var token = '';

    var historyNoAccess = false;

    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var affiliate;
    var scCalendarMonth;
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == "affiliate"){
            affiliate = pair[1];
        }else if(pair[0] == "sc-calendar-month"){
            scCalendarMonth = pair[1];
        }
    }

    var isIos;

    if(navigator.userAgent.match(/(iPad|iPhone|iPod)/g)){
        isIos = true;
    }else{
        isIos = false;
    }

    var apiPrefix = widgetSelector[0].dataset.calendarApiDomain ? widgetSelector[0].dataset.calendarApiDomain : 'https://api.supercontrol.co.uk';
    var generalKey = widgetSelector[0].dataset.calendarKey;

    var cartCheck = JSON.parse(httpGet(apiPrefix + '/v3/Calendar/Settings?key='+generalKey)).newCart;
    var cartPath = '';

    if(cartCheck){
        cartPath = 'cart';
    }else{
        cartPath = 'calendar';
    }

    var iframesUrl = '';

    for(var i = 0;i<widgetSelector.length;i++){

        widgetSelector[i].innerHTML = '';

        apiPrefix = widgetSelector[i].dataset.calendarApiDomain ? widgetSelector[i].dataset.calendarApiDomain : 'https://api.supercontrol.co.uk';
        generalKey = widgetSelector[i].dataset.calendarKey;
        
        var c = {
            domain: widgetSelector[i].dataset.calendarDomain ? widgetSelector[i].dataset.calendarDomain : 'https://secure.supercontrol.co.uk',
            apiDomain: widgetSelector[i].dataset.calendarApiDomain ? widgetSelector[i].dataset.calendarApiDomain : 'https://api.supercontrol.co.uk',
            bookingDomain: widgetSelector[i].dataset.calendarBookingDomain ? widgetSelector[i].dataset.calendarBookingDomain : 'https://secure.supercontrol.co.uk',
            siteId: widgetSelector[i].dataset.calendarSiteId,
            key: widgetSelector[i].dataset.calendarKey,
            widescreenMonths: widgetSelector[i].dataset.calendarWidescreenMonths ? widgetSelector[i].dataset.calendarWidescreenMonths : 0,
            preview: widgetSelector[i].dataset.calendarPreview,
            affiliate: affiliate === undefined ? widgetSelector[i].dataset.calendarAffiliate : affiliate,
            scCalendarMonth: scCalendarMonth
        }

        if(widgetSelector[i].dataset.calendarMobileGrid){
            c.mobileGrid = widgetSelector[i].dataset.calendarMobileGrid
        }
        
        if(widgetSelector[i].dataset.calendarDeparturePicker){
            c.departurePicker = widgetSelector[i].dataset.calendarDeparturePicker
        }

        if(widgetSelector[i].dataset.calendarPropertyId){
            c.propertyId = widgetSelector[i].dataset.calendarPropertyId
        }

        if(widgetSelector[i].dataset.calendarPreselectId){
            c.preselect = widgetSelector[i].dataset.calendarPreselectId
        }

        if(widgetSelector[i].dataset.calendarPrefillPopup){
            c.prefillPopup = widgetSelector[i].dataset.calendarPrefillPopup
        }

        if(widgetSelector[i].dataset.calendarShowTranslation){
            c.showTranslation = widgetSelector[i].dataset.calendarShowTranslation
        }

        if(widgetSelector[i].dataset.calendarArrivalDate){
            c.arrivalDate = widgetSelector[i].dataset.calendarArrivalDate
        }

        if(widgetSelector[i].dataset.calendarDefaultTranslation){
            c.defaultTranslation = widgetSelector[i].dataset.calendarDefaultTranslation
        }

        if(widgetSelector[i].dataset.calendarDepartureDate){
            c.departureDate = widgetSelector[i].dataset.calendarDepartureDate
        }

        if(widgetSelector[i].dataset.calendarNumberNights){
            c.numberNights = widgetSelector[i].dataset.calendarNumberNights
        }

        if(widgetSelector[i].dataset.calendarCapacity){
            c.capacity = widgetSelector[i].dataset.calendarCapacity
        }
       
        if(widgetSelector[i].dataset.calendarGuestsNumber){
            c.guestsNumber = widgetSelector[i].dataset.calendarGuestsNumber
        }
        
        if(widgetSelector[i].dataset.calendarChildrenNumber){
            c.childrenNumber = widgetSelector[i].dataset.calendarChildrenNumber
        }
        
        if(widgetSelector[i].dataset.calendarInfantsNumber){
            c.infantsNumber = widgetSelector[i].dataset.calendarInfantsNumber
        }

        if(widgetSelector[i].dataset.calendarOnlyCart && cartCheck){
            c.onlyCart = widgetSelector[i].dataset.calendarOnlyCart
        }

        if(widgetSelector[i].dataset.calendarCapacityBlocked && cartCheck){
            c.capacityBlocked = widgetSelector[i].dataset.calendarCapacityBlocked
        }

        if(widgetSelector[i].dataset.calendarHiddenPropertyName){
            c.hiddenPropertyName = widgetSelector[i].dataset.calendarHiddenPropertyName
        }

        iframesUrl = buildUrl(c);

        var pickerFrame = document.createElement('iframe');
        pickerFrame.id = (c.targetId || 'supercontrolCalendar')+"Widget"+i;
        pickerFrame.src = iframesUrl;

        pickerFrame.scrolling = "no";
        pickerFrame.style.width = "100%";
        pickerFrame.style.border = "none";
        if(c.calendarSize){
            pickerFrame.style.minWidth = c.calendarSize.split(",")[0] > 300 ? c.calendarSize.split(",")[0] : 300;
            pickerFrame.style.maxWidth = c.calendarSize.split(",")[1] > 0 ? c.calendarSize.split(",")[1] : "auto";
        }else{
            pickerFrame.style.minWidth = 300;
        }

        if(i == widgetSelector.length-1){
            pickerFrame.onload = initializeWidget;
        }

        pickerFrames.push(pickerFrame)

        var widgetContainer = widgetSelector;
        widgetContainer[i].appendChild(pickerFrame);

    }

    function httpGet(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    var iframesUrl = buildUrl(c);

    var calendarPopupContainer = document.createElement('div');
    calendarPopupContainer.id = "calendarPopupContainer";
    calendarPopupContainer.style.border = "none";
    calendarPopupContainer.style.position = "fixed";
    calendarPopupContainer.style.top = "0";
    calendarPopupContainer.style.right = "0";
    calendarPopupContainer.style.bottom = "0";
    calendarPopupContainer.style.left = "0";
    calendarPopupContainer.style.width = "100%";
    calendarPopupContainer.style.height = "100%";
    calendarPopupContainer.style.display = "none";
    calendarPopupContainer.style.opacity = "0";
    calendarPopupContainer.style.transition = "200ms";
    calendarPopupContainer.style.zIndex = "10000000";
    calendarPopupContainer.style.webkitOverflowScrolling = 'touch';
    calendarPopupContainer.style.overflowY = "scroll";

    if(document.getElementById("supercontrolCalendarPopup")){
        document.getElementById("supercontrolCalendarPopup").parentElement.removeChild(document.getElementById("supercontrolCalendarPopup"));
    }

    var calendarPopupFrame = document.createElement('iframe');
    calendarPopupFrame.id = "supercontrolCalendarPopup";
    calendarPopupFrame.src = iframesUrl + '&popup=true';
    calendarPopupFrame.scrolling = "yes";
    calendarPopupFrame.style.border = "none";
    if(isIos){
        calendarPopupFrame.style.position = "relative";
    }else{
        calendarPopupFrame.style.position = "fixed";
    }
    calendarPopupFrame.style.top = "0";
    calendarPopupFrame.style.right = "0";
    calendarPopupFrame.style.bottom = "0";
    calendarPopupFrame.style.left = "0";
    calendarPopupFrame.style.width = "100%";
    calendarPopupFrame.style.height = "100%";
    calendarPopupFrame.style.display = "none";
    calendarPopupFrame.style.opacity = "0";
    calendarPopupFrame.style.transition = "200ms";
    calendarPopupFrame.style.zIndex = "10000000";
    calendarPopupFrame.onload = initializePopup;
    

    calendarPopupContainer.appendChild(calendarPopupFrame);

    function initializeWidget(){
        for(var j=0; j<pickerFrames.length; j++){
            iFrameResize({
                messageCallback:c.customHandler || iframeMessageHandler,
                initCallback: function(){
                    setTimeout(function(){
                        if(isIos){
                            document.body.appendChild(calendarPopupContainer);
                        }else{
                            document.body.appendChild(calendarPopupFrame);
                        }
                    },0)
                }
            }, pickerFrames[j]);
        }
    }

    function initializePopup(){
        iFrameResize({
            autoResize:false,
            bodyBackground:"transparent",
            messageCallback:c.customHandler || iframeMessageHandler,
            initCallback: function(thisFrame){
                thisFrame.style.height = "100%";
            }
        },calendarPopupFrame);
    }
    

    function showPopup(){
        if(token.length === 36){
            calendarPopupFrame.contentWindow.postMessage(token,'*');
        }
        try{
            history.pushState({},'', window.location.href + '#calendarPopup');
        } catch(e){
            historyNoAccess = true;
        }
        
        calendarPopupFrame.style.display = "block";
        if(isIos){
            calendarPopupContainer.style.display = "block";
            document.body.style.overflow = "scroll";
        }else{
            document.body.style.overflow = "hidden";
        }
        setTimeout(function(){
            calendarPopupFrame.style.opacity = "1";
            if(isIos){
                calendarPopupContainer.style.opacity = "1";
            }
        },0)

        window.addEventListener('popstate',hidePopup)
    }

    window.addEventListener("message", function(event){
        if(event.data.length === 36){
            token = event.data;
        }
        if(event.data.action == "cartOpen"){
            cartDetails = event.data
            pickerFrames[0].contentWindow.postMessage(cartDetails,'*');
            calendarPopupFrame.contentWindow.postMessage(cartDetails,'*');
        }
        if(event.data.action == "policy"){
            newAction = event.data;
            calendarPopupFrame.contentWindow.postMessage(newAction,'*');
            showPopup();
        }
    })

    function hidePopup(){
        if(!historyNoAccess){
            history.replaceState({},'', window.location.href.replace('#calendarPopup',''));
        }
        calendarPopupFrame.style.opacity = "0";
        if(isIos){
            calendarPopupContainer.style.opacity = "1";
        }
        document.body.style.overflow = "inherit";
        setTimeout(function(){
            calendarPopupFrame.style.display = "none";
            if(isIos){
                calendarPopupContainer.style.display = "none";
            }
        },200)
        
        window.removeEventListener('popstate',hidePopup)
    }

    function removeIFrames(){
        const widgetSelector = document.querySelectorAll('[data-calendar-key]')

        for(var i = 0;i<widgetSelector.length;i++){
            document.getElementById("supercontrolCalendarWidget"+i).parentElement.removeChild(document.getElementById("supercontrolCalendarWidget"+i));
        }

    }
    
    function iframeMessageHandler(data){

        if(data.message.action === 'popup'){
            showPopup();
        }else if(data.message.action === 'reload') {
            hidePopup();
            removeIFrames();
            superControlCalendarWidgetManualBootstrap();
        }else if(data.message.action === 'openUrl') {
            top.location.href = data.message.goToUrl;
        } else if (data.message.action === 'close') {
            if(!historyNoAccess){
                history.back();
            }else{
                document.getElementById("supercontrolCalendarPopup").style.display = "none";
            }
            window.postMessage({
                action: 'closePopup'
            },'*')
        } else if (data.message.action === 'pickerLoaded'){
            window.postMessage({
                action: 'pickerLoaded'
            },'*')
        } else if (data.message.action === 'book') {
        
            function bookingInsert(){
                top.location.href = data.message.goToUrl;
            }
    
            if(window.ga){
                ga('ecommerce:addTransaction', {
                    'id': data.message.trackingItem.id,
                    'affiliation': 'SuperControl booking',
                    'revenue': data.message.trackingItem.revenue,
                    'shipping': '0',
                    'tax': '0'
                });
    
                ga('ecommerce:addItem', {
                    'id': data.message.trackingItem.id,
                    'name': data.message.trackingItem.name,
                    'sku': data.message.trackingItem.id,
                    'category': '0',
                    'price': data.message.trackingItem.revenue,
                    'quantity': '1'
                });
    
                ga('ecommerce:send');

                setTimeout(bookingInsert,0);
            } else {
                bookingInsert();
            }
        }else if(data.message.action == "ga"){
            try{
                var data = data.message.tracking_object;
                var dataLayer = window.dataLayer || (window.dataLayer = []);
                if(data.non_interaction === undefined || data.non_interaction === '') non_interaction = false;
                dataLayer.push({
                    'event': data.category,
                    'event_action': data.action,
                    'event_label': data.label,
                    'event_value': data.value,
                    'non_interaction': data.non_interaction
                })
            }catch(e){
                console.log(e)
            }
        }else if(data.message.action == "ga4"){
            try{
                var data = data.message.tracking_object;
                var dataLayer = window.dataLayer || (window.dataLayer = []);
                dataLayer.push({
                    'event': data.event_category,
                    'ecommerce': data.e_data
                })
            }catch(e){
                console.log(e)
            }
        }
    }


    function buildUrl(c){
        var url = c.domain + '/components/' + cartPath + '/widget/calendar.asp';

        if(JSON.stringify(c) !== JSON.stringify({})) {
            url += "?";
            for(var configItem in c) {
                if (configItem === 'theme' && typeof c[configItem] === 'object' && c['customStyles']!==false){
                    url += 'customStyles=true&';
                    var theme = {}
                    for (var style in c[configItem]) {
                        for (var styleNested in c[configItem][style]) {
                            theme[dictionary(style,styleNested)] = c[configItem][style][styleNested];
                        }
                    }
                    url += configItem + '=' + encodeURIComponent(JSON.stringify(theme)) + '&';
                } else {
                    url += configItem + '=' + encodeURIComponent(c[configItem]) + '&';
                }
                
            }
        }

        try{
            var gobj = window[window.GoogleAnalyticsObject];
            if (gobj) {
                var tracker, linker;
                tracker = gobj.getAll()[0];
                linker = new window.gaplugins.Linker(tracker);
                url = linker.decorate(url);
            }else{
                if(/^((?!chrome|android).)*safari/i.test(navigator.userAgent)){
                    popupUrlChange();
                }
            }
                    
            if(url.charAt(url.length-1) === '&'){
                url = url.slice(0, -1)
            }
            url += '&affc=' + getCookie('Affc');
            return url;
        }
        catch(e){
            url += "_ga=undefined";
            url += '&affc=' + getCookie('Affc');
            return url;
        }
        
    }

    function popupUrlChange() {
        var url = c.domain + '/components/' + cartPath + '/widget/calendar.asp';

        if(JSON.stringify(c) !== JSON.stringify({})) {
            url += "?";
            for(var configItem in c) {
                if (configItem === 'theme' && typeof c[configItem] === 'object' && c['customStyles']!==false){
                    url += 'customStyles=true&';
                    var theme = {}
                    for (var style in c[configItem]) {
                        for (var styleNested in c[configItem][style]) {
                            theme[dictionary(style,styleNested)] = c[configItem][style][styleNested];
                        }
                    }
                    url += configItem + '=' + encodeURIComponent(JSON.stringify(theme)) + '&';
                } else {
                    url += configItem + '=' + encodeURIComponent(c[configItem]) + '&';
                }
                
            }
        }

        try{
            setTimeout(function() {
                var gobj = window[window.GoogleAnalyticsObject];
                if(gobj){
                    var tracker, linker;
                    tracker = gobj.getAll()[0];
                    linker = new window.gaplugins.Linker(tracker);
                    url = linker.decorate(url);
                }
                if(url.charAt(url.length-1) === '&'){
                    url = url.slice(0, -1)
                }
                url += '&affc=' + getCookie('Affc');
                url += "&popup=true";
                calendarPopupFrame.src = url;
            },500)
        }
        catch(e){
            url += "_ga=undefined";
            url += '&affc=' + getCookie('Affc');
            url += "&popup=true"
            calendarPopupFrame.src = url;
        }
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    function dictionary(l1,l2){
        var dict = {
            base:{
              bg:0,
              cardBg:1,
              cardDecoration:2,
              text:3,
              active:4,
              activeNegative:5,
              greyAccent:6,
              font:7,
              gray:8,
              alert:9,
              clickFeedbackRGB: 41
            },
            loader:{
              bg:10,
              wheel:11,
              spinner:12
            },
            header:{
              bg:13,
              text:14,
              bgNegative:15,
              textNegative:16,
              font:17
            },
            day:{
              text:18,
              bg:19,
              weekdayText:20,
              weekdayNumber:21,
              bookedBg: 37,
              bookedText: 38,
              pastOrOuter: 39,
              pastAndOuter: 40
            },
            dayActive:{
              radius:22,
              arrivalBg:23,
              arrivalBorder:24,
              arrivalText:25,
              arrivalDecoration:26,
              inRangeBg:27,
              inRangeText:28,
              inRangeDepartureBorder:29,
              inRangeDepartureDecoration:30,
              arrivalActiveBg:31,
              arrivalActiveBorder:32,
              arrivalActiveText:33,
              arrivalActiveDecoration:34,
              smallGridDotDefault:35,
              smallGridDotInRange:36
            }
          }
        return dict[l1][l2];
    }
});
superControlCalendarWidgetManualBootstrap();
setInterval(function(){ 
    const widgetSelector = document.querySelectorAll('[data-calendar-key]');
    if(widgetSelector.length > 0){
        if(widgetSelector[0].childNodes[0]){
            if(widgetSelector[0].childNodes[0].nodeName != 'IFRAME'){
                superControlCalendarWidgetManualBootstrap();
            }
        }else{
            superControlCalendarWidgetManualBootstrap();
        }
    }
}, 500);
});