/// <reference path="jquery-1.11.0.js" />


///Author : Henri d'Orgeval


//core extensions
( function ( $, undefined ) {
    $.extensions = $.extensions || {};
    var extensions = $.extensions;

    extensions.isNullOrUndefined = function (input) {
        try {
            if ( input === undefined ) {
                return true;
            }

            if ( input === null ) {
                return true;
            }

            return false;

        } catch ( e ) {
            return false;
        }
    };

    extensions.isEmpty = function ( input ) {
        try {

            if ( input === undefined ) {
                return true;
            }

            if ( input === null ) {
                return true;
            }

            if (input.window) {
                return false;
            }

            if ( input.length === 0 ) {
                return true;
            }

            //check for native types
            if ( typeof input === "number" ) {
                return false;
            }

            //check for native types
            if ( typeof input === "boolean" ) {
                return false;
            }

            if ( typeof input === "function" ) {
                return false;
            }

            // check for empty literal object
            for ( var property in input ) {
                if ( input.hasOwnProperty && input.hasOwnProperty( property ) ) {
                    return false;
                }
            }
            
            return true;

        } catch ( e ) {
            return false;
        }
    };

    extensions.isNullOrUndefinedOrEmpty = function ( input ) {
        try {
            if ( extensions.isNullOrUndefined( input ) ) {
                return true;
            }

            return extensions.isEmpty( input );

        } catch ( e ) {
            return false;
        }
    };

    extensions.isNotNullOrUndefinedOrEmpty = function ( input ) {
        return extensions.isNullOrUndefinedOrEmpty( input ) === false;
    };

    $.isNullOrUndefinedOrEmpty = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is either null or undefined or empty.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is empty.</returns>
        /// </signature>
        try {
            var result = extensions.isNullOrUndefinedOrEmpty( input );
            return result;
        } catch ( e ) {
            return false;
        }
    };

    $.isNotNullOrUndefinedOrEmpty = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is not null, not undefined and not empty.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is not empty.</returns>
        /// </signature>
        try {
            var result = extensions.isNotNullOrUndefinedOrEmpty( input );
            return result;

        } catch ( e ) {
            return true;
        }
    };

    //Core String extensions
    if ( "test".isString === undefined ) {
        String.prototype.isString = function () {
            return true;
        };
    }

    if ("test".trim === undefined) {
        String.prototype.trim = function () {
            try {
                var s = this + '';
                s = s.replace(/^\s+|\s+$/g, '');
                s = s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                s = s.replace(/(^(\&nbsp\;)+)|((\&nbsp\;)+$)/g, '');
                s = s.replace(/(^(\&#160\;)+)|((\&#160\;)+$)/g, '');
                return s;

            } catch (e) {
                return this;
            }
        };
    }

    if ( "test".isNullOrEmpty === undefined ) {
        String.prototype.isNullOrEmpty = function () {
            try {
                if ( this === null ) {
                    return true;
                }

                if ( this === undefined ) {
                    return true;
                }

                if ( this.length === undefined ) {
                    return true;
                }

                if ( this.length === 0 ) {
                    return true;
                }

                return false;

            } catch ( e ) {
                return false;
            }
        };
    }

    if ( "test".isNullOrEmptyOrWhitespace === undefined ) {
        String.prototype.isNullOrEmptyOrWhitespace = function () {
            try {
                if ( this.isNullOrEmpty() ) {
                    return true;
                }

                var trimedInput = this.trim();

                if ( trimedInput.isNullOrEmpty() ) {
                    return true;
                }

                return false;

            } catch ( e ) {
                return false;
            }
        };
    }

    if ( "test".toInt === undefined ) {
        String.prototype.toInt = function () {
            try {
                if ( this.isNullOrEmptyOrWhitespace() ) {
                    return NaN;
                }

                var intValue = parseInt( this, 10 );

                return intValue;

            } catch ( e ) {
                return NaN;
            }
        };
    }

    if ( "test".isInArray === undefined ) {
        String.prototype.isInArray = function ( inputArray ) {
            try {

                if ( this.isNullOrEmptyOrWhitespace() ) {
                    return false;
                }

                if ( $.isNotArray( inputArray ) ) {
                    return false;
                }

                var itemCount = inputArray.length;

                if ( itemCount === 0 ) {
                    return false;
                }

                var thisValue = this.toString();

                for ( var i = 0; i < itemCount; i++ ) {
                    if ( inputArray[i] === thisValue ) {
                        return true;
                    }
                }

                return false;

            } catch ( e ) {
                return false;
            }
        };
    }

    if ( "test".isNotInArray === undefined ) {
        String.prototype.isNotInArray = function ( inputArray ) {
            return this.isInArray( inputArray ) === false;
        };
    }
    //end Core string extensions

    //Core Array extensions
    if ( [].duplicate === undefined ) {
        Array.prototype.duplicate = function ( ) {
            /// <signature>
            /// <summary>Duplicate input array.</summary>
            /// <param name="input" type="Array">Array to be duplicated</param>
            /// <returns type="Array">Returns a new array that is a copy of input array.</returns>
            /// </signature>
            try {
                var duplicatedArray = [];
                var itemCount = this.length;
                for ( var i = 0; i < itemCount; i++ ) {
                    var item = this[i];
                    duplicatedArray.push( item );
                }

                return duplicatedArray;

            } catch ( e ) {
                return [];
            }
        };
    }
    //end Core array extensions

    $.isString = function (input) {
        /// <signature>
        /// <summary>Check if input object is a string.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is a string.</returns>
        /// </signature>
        try {
            if (extensions.isNullOrUndefined(input)) {
                return false;
            }

            if (typeof input === "string") {
                return true;
            }

            //hack from hdo
            if (typeof input.isString !== "function") {
                return false;
            }

            if (input.isString()) {
                return true;
            }

            return false;

        } catch (e) {
            return false;
        }
    };

    $.isNotString = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is not a string.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is not a string.</returns>
        /// </signature>
        return $.isString( input ) === false;
    };

    $.isNotFunction = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is not a function.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is not a function.</returns>
        /// </signature>
        return $.isFunction(input) === false;
    };

    $.isNumber = function (input) {
        /// <signature>
        /// <summary>Check if input object is a number.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is a number.</returns>
        /// </signature>
        try {
            if (extensions.isNullOrUndefined(input)) {
                return false;
            }

            if (isNaN(input)) {
                return false;
            }

            if (typeof input === "number") {
                return true;
            }

            if ($.isNotString(input)) {
                return false;
            }

            // at this step we know that input is a string
            // try to convert to float
            var numberValue = parseFloat( input );

            if (isNaN(numberValue)) {
                return false;
            }

            return true;

        } catch (e) {
            return false;
        }
    };

    $.isNotNumber = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is not a number.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is not a number.</returns>
        /// </signature>
        return $.isNumber( input ) === false;
    };

    $.isInt = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is an integer.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is an integer.</returns>
        /// </signature>
        try {
            if ( $.isNotNumber(input) ) {
                return false;
            }

            var remainder = input % 1;
            if ( remainder === 0 ) {
                return true;
            }

            return false;

        } catch ( e ) {
            return false;
        }
    };

    $.isNotInt = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is not an integer.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is not an integer.</returns>
        /// </signature>
        return $.isInt( input ) === false;
    };

    extensions.isArray = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is an array.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is an array.</returns>
        /// </signature>
        try {
            if (extensions.isNullOrUndefined(input)) {
                return false;
            }

            if (input.push && $.isFunction( input.push) ) {
                return true;
            }

            return false;

        } catch (e) {
            return false;
        }
    };

    $.isArrayEx = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is an array
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is an array.</returns>
        /// </signature>
        try {
            var result = extensions.isArray( input );
            return result;
        } catch ( e ) {
            return false;
        }
    };

    $.isNotArray = function ( input ) {
        /// <signature>
        /// <summary>Check if input object is not an array.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is not an array.</returns>
        /// </signature>
        return extensions.isArray( input ) === false;
    };

    extensions.getQueryStringData = function (url) {
        /// <signature>
        /// <summary>Get the query string as a literal object.
        ///</summary>
        /// <param name="url" type="String">url from which to extract the query string. 
        ///             If this parameter is missing current page url is taken.
        /// </param>
        /// <returns type="Object">Returns a literal object from the Query String analysis.
        ///         if an error occurs, the returned object is extended 
        ///         with a property called lastError that contains the error details.
        ///</returns>
        /// </signature>
        try {
            var queryString = document.location.search.substr( 1 );
            if ( url !== undefined ) {
                queryString = '';
                var parts = url.split( '?' );
                if ( parts && parts.length === 2 ) {
                    queryString = parts[1];
                }
            }

            if ( $.isNullOrUndefinedOrEmpty( queryString ) ) {
                return {};
            }

            var data = {};
            
            $.each( queryString.split( '&' ), function ( c, q ) {
                try {

                    var query = q.split( '=' );
                    var key = query[0].toString();
                    if ( $.isNullOrUndefinedOrEmpty( key ) ) {
                        key = q;
                    }
                    var value = '';

                    if ( query[1] ) {
                        value = query[1].toString();
                    }

                    value = value.replace( /\+/g, " " );
                    value = decodeURIComponent( value );

                    data[key] = value;


                } catch ( e ) {
                    data.lastError = e + '';
                }
            } );

            return data;

        } catch ( e ) {

            return { lastError : e + ''};
        }
    };

    $.getQueryStringData = function ( url ) {
        /// <signature>
        /// <summary>Get the query string as a literal object.
        ///</summary>
        /// <param name="url" type="String">url from which to extract the query string. 
        ///             If this parameter is missing current page url is taken.
        /// </param>
        /// <returns type="Object">Returns a literal object from the Query String analysis.
        ///         if an error occurs, the returned object is extended 
        ///         with a property called lastError that contains the error details.
        ///</returns>
        /// </signature>
        try {
            var result = extensions.getQueryStringData( url);
            return result;

        } catch ( e ) {
            return { lastError: e + '' };
        }
    };

} )( jQuery );
// end core extensions

//trace API
(function ($, undefined) {
    
    var trace = {};
    $.extensions = $.extensions || {};
    $.extensions.trace = trace;

    trace.notImplementedException = function () {
        this.name = 'notImplementedException';
        this.message = 'Not Implemented.';
    };
    trace.notImplementedException.prototype = new Error();
    trace.notImplementedException.prototype.constructor = trace.notImplementedException;

    trace.defaultOptions = {
        sendToRemote: false,
        remoteUrl: null,
        interceptAjaxErrors: false
    };

    trace.options = $.extend({}, trace.defaultOptions);

    trace.init = function (options) {
        /// <signature>
        /// <summary>Override predefined options to customize the behavior of the trace API.</summary>
        /// <param name="options" type="Object">Literal object</param>
        /// <returns type="void"></returns>
        /// </signature>

        trace.options = $.extend( {}, trace.defaultOptions,options );

        if ( trace.options.interceptAjaxErrors === true ) {
            $.ajaxSetup( {
                error: function ( xhr, statusMessage, errorMessage ) {
                    try {
                        if ( trace.logAjaxError ) {
                            trace.logAjaxError( xhr, statusMessage, errorMessage );
                        }
                    } catch ( e ) {
                        $.logException( e );
                    }
                    
                },
                beforeSend: function ( xhr, settings ) {
                    try {
                        //inject custom property in the xhr object the request Url
                        //for logging purpose in case response code != 200
                        xhr.requestURL = settings.url;
                    } catch ( e ) {
                        $.logException( e );
                    }

                }
            } );
        }

        //throw new trace.notImplementedException();
    };

    trace.toSmallDateTime = function ( input ) {
        try {
            /// <signature>
            /// <summary>Get the input date in the following format : 'yyyy/mm/dd hh:mm:ss'</summary>
            /// <param name="input" type="Date">Date object </param>
            /// <returns type="String">Returns the formated date. If something goes wrong an empty string is returned.</returns>
            /// </signature>
            var dd = input.getDate();
            var mm = input.getMonth() + 1;
            var yyyy = input.getFullYear();
            var hh = input.getHours();
            var mn = input.getMinutes();
            var ss = input.getSeconds();

            if ( dd < 10 ) {
                dd = '0' + dd;
            }
            if ( mm < 10 ) {
                mm = '0' + mm;
            }

            if ( hh < 10 ) {
                hh = '0' + hh;
            }

            if ( mn < 10 ) {
                mn = '0' + mn;
            }

            if ( ss < 10 ) {
                ss = '0' + ss;
            }

            var formattedDate = yyyy + '/' + mm + '/' + dd + ' ' + hh + ':' + mn + ':' + ss;
            return formattedDate;

        } catch (e) {
            return "";
        }
    };
    trace.logExceptionToConsole =  function ( ex ) {
        /// <signature>
        /// <summary>Log the input exception object to the Console device.</summary>
        /// <param name="ex" type="Object">Exception object coming from the catch bloc. </param>
        /// <returns type="String">Returns the string that will be showed in the Console</returns>
        /// </signature>
        try {
            var defaultMessage = "";

            if ( ex === undefined) {
                return defaultMessage;
            }

            if ( ex === null ) {
                return defaultMessage;
            }

            if ( console === undefined ) {
                return defaultMessage;
            }

            if ( console.error === undefined ) {
                return defaultMessage;
            }

            var smalldateTime = trace.toSmallDateTime(new Date());
            var msg = "[" + smalldateTime + "] ";

            // if there is a stack property : return only this property
            if ( ex.stack ) {
                msg += ex.stack;
                console.error(msg);
                return msg;
            }

            //if there is a name property : should be the type of the exception
            if (ex.name) {
                msg += "[" + ex.name + "]";
            }

            // if there is a message property : return only this property
            if ( ex.message ) {
                msg += ex.message;
                console.error(msg);
                return msg;
            }

            //fallback : try to return the input object toString() call
            msg += ex.toString();
            console.error(msg);
            return msg;

        } catch ( e ) {
            var msg = "Internal exception : '" + e + "'";
            return msg;
                
        }
    };

    trace.logErrorToConsole = function ( err ) {
        /// <signature>
        /// <summary>Log application error on all configured output devices (Console, Remote Server, custom DOM element</summary>
        /// <param name="err" type="Object">literal object that is like { message : "xxx", functionName : "yyy", info : "ttt" }</param>
        /// <returns type="String">Returns the string that will be showed in the Console</returns>
        /// </signature>
        try {
            if ( err === undefined ) {
                return "";
            }

            if ( console === undefined ) {
                return "";
            }

            if ( console.error === undefined ) {
                return "";
            }

            var smalldateTime = trace.toSmallDateTime( new Date() );
            var msg = "[" + smalldateTime + "] ";

            for ( var property in err ) {
                if ( property === 'callerCode' ) {
                    continue;
                }
                if ( err.hasOwnProperty( property ) ) {
                    msg += "[" + property +": " + err[property] + "] ";
                }
            }

            console.error( msg );
            return msg;

        } catch ( e ) {
            return trace.logExceptionToConsole( e );
        }
    };

    trace.remoteLoggingIsEnabled = function () {
        try {

            if ( trace.options.sendToRemote === true ) {
                return true;
            }

            return false;
        } catch ( e ) {
            trace.logExceptionToConsole( e );
            return false;
        }
    };
    trace.remoteLoggingIsNotEnabled = function () {
        return trace.remoteLoggingIsEnabled() === false;
    };

    trace.sendToRemote = function ( options ) {
        /// <signature>
        /// <summary>Send a custom object to a remote server. 
        ///          Remote server Url is defined in $.extensions.trace.options.remoteUrl property
        /// </summary>
        /// <param name="options" type="Object">Literal object that handles all info to send data to the remote server.
        ///             This literal object has the following signature :
        ///              {
        ///                  key , -> name of the key to insert in the query string
        ///                  value  -> custom object to send to the server
        ///              }
        /// </param>
        /// <returns type="String">Returns the string that will be sent to the remote server</returns>
        /// </signature>
        try {
            //check if sending messages to remote server is enabled
            if ( trace.remoteLoggingIsNotEnabled() ) {
                return "";
            }

            if ( $.isNullOrUndefinedOrEmpty( options ) ) {
                trace.logErrorToConsole( {
                    message: "The options parameter is not defined. Errors cannot be sent to remote server."
                } );
                return "";
            }

            var remoteUrl = trace.options.remoteUrl;

            if ( $.isNullOrUndefinedOrEmpty( remoteUrl ) ) {
                trace.logErrorToConsole( {
                    message: "The remoteUrl option is not defined. Errors cannot be sent to remote server.",
                    info: "Check that you have the remoteUrl option set in the options object passed to the $.initTrace() method."
                } );
                return "";
            }

            //build the request url
            var requestUrl = remoteUrl;

            var data = $.getQueryStringData( remoteUrl );
            if ( $.isNotNullOrUndefinedOrEmpty(data) ) {
                requestUrl = remoteUrl.split( '?' )[0];
            }

            var content = JSON.stringify( options.value );
            data[options.key] = content;

            requestUrl += '?';

            var isFirstParameter = true;
            for ( var p in data ) {
                if (isFirstParameter === false) {
                    requestUrl += '&';
                }
                
                requestUrl += p + '=' + encodeURIComponent( data[p] );
                isFirstParameter = false;
            }

            var img = new Image();
            img.src = requestUrl;

            return requestUrl;

        } catch ( e ) {
            trace.logExceptionToConsole( e );
        }
    };

    trace.httpStatusInfoForCode = function ( statusCode ) {
        try {
            if ( $.isNullOrUndefinedOrEmpty(statusCode) ) {
                return "";
            }

            var statusErrorMap = {
                0: "Cross Domain call is rejected by the browser (see CORS configuration)",
                400: "Server understood the request but request content was invalid.",
                401: "Unauthorised access.",
                403: "Forbidden resouce can't be accessed",
                404: "The url used is not recognized by the server. Please check Url",
                500: "Internal Server Error.",
                503: "Service Unavailable"
            };
            var message = "Http status code : " + statusCode + "; ";
            if ( statusCode in statusErrorMap ) {
                message += statusErrorMap[statusCode];
            }
            return message;

        } catch ( e ) {
            return e + '';
        }
    };

    trace.logAjaxErrorToConsole = function ( xhr, statusMessage, errorMessage ) {
        /// <signature>
        /// <summary>Log Ajax error on Console</summary>
        /// <param name="xhr" type="Object">XMLHttpRequest used for the Ajax call.</param>
        /// <param name="statusMessage" type="String">Status message sent back by jQuery</param>
        /// <param name="errorMessage" type="String">Error message sent back by jQuery</param>
        /// <returns type="String">Returns the string that will be showed in the Console</returns>
        /// </signature>
        try {

            var err = $.extend( {}, xhr, { statusMessage: statusMessage, errorMessage: errorMessage } );

            err.httpStatusCodeInfo = trace.httpStatusInfoForCode( xhr.status );
            var msg = trace.logErrorToConsole( err );
            return msg;

        } catch ( e ) {
            return trace.logExceptionToConsole( e );
        }

    };

    trace.logAjaxErrorToRemote = function ( xhr, statusMessage, errorMessage ) {
        /// <signature>
        /// <summary>Log Ajax error on Remote</summary>
        /// <param name="xhr" type="Object">XMLHttpRequest used for the Ajax call.</param>
        /// <param name="statusMessage" type="String">Status message sent back by jQuery</param>
        /// <param name="errorMessage" type="String">Error message sent back by jQuery</param>
        /// <returns type="String">Returns the string that will be showed in the Console</returns>
        /// </signature>
        try {

            var err = $.extend( {}, xhr, { statusMessage: statusMessage, errorMessage: errorMessage } );

            err.httpStatusCodeInfo = trace.httpStatusInfoForCode( xhr.status );

            var msg = trace.sendToRemote( { key: 'ajaxErr', value : err } );
            return msg;

        } catch ( e ) {
            return trace.logExceptionToConsole( e );
        }

    };

    trace.logAjaxError = function ( xhr, statusMessage, errorMessage ) {
        /// <signature>
        /// <summary>Log Ajax error on all configured output devices (Console, Remote Server, custom DOM element, etc ...).
        /// <param name="xhr" type="Object">XMLHttpRequest used for the Ajax call.</param>
        /// <param name="statusMessage" type="String">Status message sent back by jQuery</param>
        /// <param name="errorMessage" type="String">Error message sent back by jQuery</param>
        /// <returns type="void"></returns>
        /// </signature>
        try {

            trace.logAjaxErrorToConsole( xhr, statusMessage, errorMessage );
            trace.logAjaxErrorToRemote( xhr, statusMessage, errorMessage );

        } catch ( e ) {
            trace.logExceptionToConsole( e );
        }

    };

    //public interface on the jQuery lib
    $.initTrace = function (options) {
        /// <signature>
        /// <summary>Override predefined options to customize the behavior of the trace API.
        ///          This method is a shortcut for $.extensions.trace.init(options);
        ///</summary>
        /// <param name="options" type="Object">Literal object with the following signature:
        ///             {
        ///                sendToRemote: false,
        ///                remoteUrl: null,
        ///                interceptAjaxErrors
        ///            };
        ///</param>
        /// <returns type="void"></returns>
        /// </signature>
        trace.init( options );
    };

    $.logException = function (ex) {
        /// <signature>
        /// <summary>Log exception on all configured output devices (Console, Remote Server, custom DOM element, etc ...).
        ///</summary>
        /// <param name="ex" type="Object">exception object</param>
        /// <returns type="void"></returns>
        /// </signature>
        try {

            trace.logExceptionToConsole(ex);

            trace.sendToRemote( { key: 'ex', value: ex } );

            //TODO : log inside specific DOM element

        } catch (e) {
            trace.logExceptionToConsole(e);
        }
    };

    $.logError = function ( err ) {
        /// <signature>
        /// <summary>Log Application error on all configured output devices (Console, Remote Server, custom DOM element, etc ...).
        ///</summary>
        /// <param name="err" type="Object">literal object that is like { message : "xxx", functionName : "yyy", info : "ttt" }</param>
        /// <returns type="void"></returns>
        /// </signature>
        try {

            // try find caller
            try {
                var caller = $.logError.caller;
                var callerName = caller.name.toString();
                var callerCode = caller.toString();
                err.callerName = callerName;
                err.callerCode = callerCode;

            } catch ( e ) {

            }

            trace.logErrorToConsole( err );

            trace.sendToRemote( { key: 'err', value: err } );

            //TODO : log inside specific DOM element

        } catch ( e ) {
            trace.logExceptionToConsole( e );
        }
    };


} )( jQuery );
//end trace API


//async extensions
(function ($, undefined) {
    $.extensions = $.extensions || {};
    var extensions = $.extensions;

    var asyncKeys = {};

    $.executeAsync = function ( context, f, delay, asyncKey ) {
        /// <signature>
        /// <summary>Execute asynchrounously input function f.
        ///</summary>
        /// <param name="context" type="Object">Object that will be used to set the this keyword for method f.</param>
        /// <param name="f" type="Function">Function that will be called asynchronously.</param>
        /// <param name="delay" type="Number">Number of milliseconds to wait before calling the function f.</param>
        /// <param name="asyncKey" type="String">A key that is used to debounce the call of the function f</param>
        /// <returns type="void"></returns>
        /// </signature>
        try {
            if ( extensions.isNullOrUndefined( context ) ) {
                context = this;
            }

            if ( $.isNotFunction( f ) ) {
                $.logError( {
                    functionName: "executeAsync",
                    message: "Input handler is not a function : '" + f + "'"
                } );
                return;
            }

            var defaultDelay = 0;
            if ( $.isNumber( delay ) ) {
                defaultDelay = delay;
            }

            if ( extensions.isNullOrUndefinedOrEmpty( asyncKey ) ) {

                setTimeout( function () {
                    f.call( context );
                }, defaultDelay );

                return;
            }

            //debounce
            if ( asyncKeys[asyncKey] ) {
                clearTimeout( asyncKeys[asyncKey] );
            }

            asyncKeys[asyncKey] = setTimeout( function () {
                f.call( context );
            }, defaultDelay );

        } catch ( e ) {
            $.logException( e );
            setTimeout( f, 0 );
        }
    };

    $.executeAsyncLoopOnArray = function ( options ) {
        /// <signature>
        /// <summary>Execute a loop asynchronously. 
        ///     At each iteration the thread is released and the UI thread can still process user actions
        /// </summary>
        /// <param name="options" type="Object">Literal object that holds all callbacks and the input array.
        ///         This object has the following signature:
        ///         options = {
        ///             input : input array on which to execute the asynchronous for loop
        ///             processItem : The callback that is called at each iteration
        ///                           The callback must have the following signature function(i,item){} where i is the loop counter and item is input[i].
        ///             context : The object that will be accessible within the callbacks with the this keyword.
        ///             onStart : The callback that will be called once before the loop starts.
        ///             onProgress : The callback that will be called at each iteration to enable the caller to update the DOM with a progress bar
        ///             onEnd : The callback that will be called when all iterations are done.
        ///             cancel : The callback that will be called at each iteration to check if the loop must be canceled due to external business conditions.
        ///                     The cancel callback must have the following signature : function(i,item){} where i is the loop counter and item is input[i].
        ///                     The cancel callback must return true of false.
        ///             onCanceled : The callback that will be called if the loop has been canceled
        ///         }
        /// </param>
        /// <returns type="void"></returns>
        /// </signature>
        try {
            if ( $.isNullOrUndefinedOrEmpty(options) ) {
                $.logError( {
                    functionName: "$.executeAsyncLoopOnArray",
                    message: "options parameter is null or undefined or empty : '" + options + "'"
                } );
                return;
            }

            var input = options.input;
            if ( $.isNotArray( input ) ) {
                $.logError( {
                    functionName: "$.executeAsyncLoopOnArray",
                    message: "input property is not an array but is: '" + input + "'"
                } );
                return;
            }

            var processItem = options.processItem;
            if ( $.isNotFunction( processItem ) ) {
                $.logError( {
                    functionName: "$.executeAsyncLoopOnArray",
                    message: "processItem callback is not a function but is: '" + processItem + "'"
                } );
                return;
            }

            var itemCount = input.length;
            if ( itemCount === 0 ) {
                //nothing to do
                return;
            }

            var context = options.context;
            if ( extensions.isNullOrUndefined( options.context ) ) {
                context = this;
            }

            //call the onStart callback
            var onStart = options.onStart;
            if ( onStart && $.isFunction( onStart ) ) {
                try {
                    onStart.call( context );
                } catch ( e ) {
                    $.logException( e );
                }
            }

            var cancel = options.cancel;
            var cancelCallbackMustBeCalled = false;
            if ( cancel && $.isFunction( cancel ) ) {
                cancelCallbackMustBeCalled = true;
            }

            var onProgress = options.onProgress;
            var onProgressCallbackMustBeCalled = false;
            if ( onProgress && $.isFunction( onProgress ) ) {
                onProgressCallbackMustBeCalled = true;
            }

            var onEnd = options.onEnd;
            var onCanceled = options.onCanceled;

            //work only on a copy of the input array
            var input2 = input.duplicate();

            var i = -1;
            var iterationCounter = 0;
            var canceled = false;

            var processNext = function () {
                try {
                    var item = input2.shift();
                    i += 1;

                    try {
                        processItem.call( context, i, item );
                    } catch ( e ) {
                        $.logException( e );
                    }
                    
                    //check if the loop must be canceled
                    if ( cancelCallbackMustBeCalled ) {
                        try {
                            canceled = cancel.call( context, i, item );
                        } catch ( e ) {
                            $.logException( e );
                        }
                    }

                } catch ( e ) {
                    $.logException( e );
                }
                finally {
                    iterationCounter += 1;
                    if ( onProgressCallbackMustBeCalled ) {
                        try {
                            onProgress.call( context, iterationCounter, itemCount );
                        } catch ( e ) {
                            $.logException( e );
                        }
                    }

                    // check for end of loop
                    if ( input2.length === 0 && onEnd === undefined ) {
                        return;
                    }

                    if ( input2.length === 0 && $.isFunction( onEnd ) ) {
                        try {
                            onEnd.call( context );
                        } catch ( e ) {
                            $.logException( e );
                        }
                        
                        return;
                    }

                    if ( canceled === true && $.isFunction( onCanceled ) ) {
                        try {
                            onCanceled.call( context );
                        } catch ( e ) {
                            $.logException( e );
                        }
                        
                        return;
                    }

                    if ( canceled === true ) {
                        return;
                    }

                    //release thread to let the UI be responsive
                    setTimeout( processNext, 0 );
                }
            };

            processNext();

        } catch ( e ) {
            $.logException( e );
        }
    };

    

})(jQuery);
// end async extensions



//Event Handlers extensions
( function ( $, undefined ) {
    $.extensions = $.extensions || {};
    var extensions = $.extensions;
    extensions.eventHandlers = extensions.eventHandlers || {};
    var eventHandlers = extensions.eventHandlers;
    var listeners = {};
    var events = [];

    eventHandlers.eventHasListeners = function ( eventName ) {
        try {
            if ( $.isNotString( eventName ) ) {
                return false;
            }

            if ( eventName.isNullOrEmptyOrWhitespace() ) {
                return false;
            }

            if ( $.isNullOrUndefinedOrEmpty( listeners ) ) {
                return false;
            }

            var eventNameListeners = listeners[eventName];

            if ( $.isNullOrUndefinedOrEmpty( eventNameListeners ) ) {
                return false;
            }

            return true;

        } catch ( e ) {
            //TODO : log
            $.logException( e );
            return false;
        }
    };

    eventHandlers.eventHasNoListener = function ( eventName ) {
        return eventHandlers.eventHasListeners( eventName ) === false;
    };

    eventHandlers.eventHandlerIsRegistered = function ( eventName, handler ) {
        try {
            if ( eventHandlers.eventHasNoListener( eventName ) ) {
                return false;
            }

            if ( $.isNotFunction( handler ) ) {
                return false;
            }

            // get all listeners for this event
            var eventListeners = listeners[eventName];
            var listernersCount = eventListeners.length;

            for ( var i = 0; i < listernersCount; i++ ) {
                if ( eventListeners[i] === handler ) {
                    return true;
                }
            }

            return false;

        } catch ( e ) {
            $.logException( e );
            return false;
        }
    };

    $.registerEvents = function ( eventNames ) {
        /// <signature>
        /// <summary>Register your Application events</summary>
        /// <param name="eventNames" type="Array">Array of all the event names exposed by your Application.</param>
        /// <returns type="void"></returns>
        /// </signature>
        try {
            if ( $.isNullOrUndefinedOrEmpty( eventNames ) ) {
                return;
            }

            if ( $.isNotArray( eventNames ) ) {
                $.logError( {
                    functionName: "$.registerEvents",
                    message: "input parameter should be an array of string but is : '" + eventNames + "'"
                } );
                return;
            }

            var eventsCount = eventNames.length;
            for ( var i = 0; i < eventsCount; i++ ) {
                var eventName = eventNames[i] + '';
                if ( eventName.isInArray(events) ) {
                    continue;
                }
                events.push( eventName );
            }

        } catch ( e ) {
            $.logException( e );
        }
    };

    $.registerEventHandler = function ( eventName, handler ) {
        /// <signature>
        /// <summary>Register your event handler to a specific application event.</summary>
        /// <param name="eventName" type="String">Name of the event you want to listen to.</param>
        /// <param name="handler" type="Function">Function that will be called when raising the event. 
        ///     This function must have the signature function(source, eventArgs){}, 
        ///     where source is the object that is at the origin of the event, 
        ///     and eventArgs is a placeholder object for informations needed by the listener.
        /// </param>
        /// <returns type="void"></returns>
        /// </signature>
        try {
            if ( $.isNotFunction( handler ) ) {
                $.logError( {
                    functionName: "$.registerEventHandler",
                    message: "The event handler is not a function.",
                    info: "Check the name of your event handler for event : '" + eventName + "'."
                } );
                return;
            }

            if ( $.isNotString( eventName ) ) {
                $.logError( {
                    functionName: "$.registerEventHandler",
                    message: "eventName parameter should be a string but is : '" + eventName + "'"
                } );
                return;
            }

            if ( eventName.isNotInArray(events) ) {
                $.logError( {
                    functionName: "$.registerEventHandler",
                    message: "eventName '" + eventName + "' has not been registered by the Application.",
                    info: "Ensure the application has called the $.registerEvents() method."
                } );
                return;
            }

            // check if event handler has already been registered
            if ( eventHandlers.eventHandlerIsRegistered( eventName, handler ) ) {
                return;
            }

            var eventListeners = listeners[eventName];
            if ( $.isNullOrUndefinedOrEmpty( eventListeners ) ) {
                listeners[eventName] = [];
            }

            //TODO : check if eventName is a known event
            listeners[eventName].push( handler );

        } catch ( e ) {
            $.logException( e );
        }
    };

    $.raiseEvent = function ( options ) {
        /// <signature>
        /// <summary>Raise Application Event Synchronously. 
        /// </summary>
        /// <param name="options" type="Object">Literal object that holds all data to raise the event.
        ///         This object has the following signature:
        ///         options = {
        ///             eventName       : name of the event
        ///             eventContext    : The object that will be accessible within the listeners callbacks with the this keyword.
        ///             eventSource     : The object that is at the origin of the event.
        ///                               This object will passed as the first parameter of the listener callback
        ///             eventArgs       : Literal object that contains informations usefull for the listener.
        ///                               This object will be passed as the second argument of the listener callback.
        ///         }
        /// </param>
        /// <returns type="void"></returns>
        /// </signature>
        try {
            if ( $.isNullOrUndefinedOrEmpty(options) ) {
                return;
            }

            var eventName = options.eventName;

            if ( eventHandlers.eventHasNoListener( eventName ) ) {
                return;
            }

            var eventListeners = listeners[eventName];
            var listernersCount = eventListeners.length;

            var eventContext = options.eventContext;
            if ( $.isNullOrUndefinedOrEmpty( eventContext ) ) {
                eventContext = this;
            }

            for ( var i = 0; i < listernersCount; i++ ) {
                var handler = eventListeners[i];
                try {
                    handler.call(eventContext, options.eventSource, options.eventArgs );
                } catch ( e ) {
                    $.logException( e );
                }
            }

        } catch ( e ) {
            $.logException( e );
        }
    };

    $.tryFindFunctionByName = function ( input ) {
        /// <signature>
        /// <summary>Try to find (in the window root object) a function by its name.
        ///</summary>
        /// <param name="input" type="String">Name of the function to find.</param>
        /// <returns type="Function">Returns the found function. Returns null otherwise.</returns>
        /// </signature>
        try {
            if ( $.isNullOrUndefinedOrEmpty( input ) ) {
                return null;
            }

            if ( $.isNotString( input ) ) {
                return null;
            }

            // check if the function exist in the root object
            var foundFunction = window[input];
            if ( $.isFunction( foundFunction ) ) {
                return foundFunction;
            }

            // function is defined in a namespace
            var namespaces = input.split( "." );
            if ( $.isNullOrUndefinedOrEmpty( namespaces ) ) {
                return null;
            }

            var functionName = namespaces[namespaces.length - 1];
            var parentObject = window;
            for ( var i = 0; i < namespaces.length - 1; i++ ) {
                var namespace = namespaces[i];
                parentObject = parentObject[namespace];
            }

            foundFunction = parentObject[functionName];
            if ( $.isFunction( foundFunction ) ) {
                return foundFunction;
            }

            $.logError( {
                functionName: "tryFindFunctionByName",
                message: "Cannot find function named : '" + input + "'",
                info: "Check case sensitivity and namespaces"
            } );
            return null;

        } catch ( e ) {
            $.logException( e );
            return null;
        }
    };

} )( jQuery );
// end Event Handlers extensions





//non-chained extensions
( function ( $, undefined ) {
    
    $.fn.extend( {
        found: function () {
            /// <signature>
            /// <summary>Check if the element has been found in the DOM. 
            ///     typical usage : var jqElement = $(selector); if ( jqElement.found() ) { ... }
            ///</summary>
            /// <returns type="Boolean">Returns true if the element has been found in the DOM.</returns>
            /// </signature>
            try {
                if ( this === null ) {
                    return false;
                }

                if ( this === undefined ) {
                    return false;
                }

                if ( this.length === undefined ) {
                    return false;
                }

                if ( this.length === 0 ) {
                    return false;
                }

                return true;

            } catch ( e ) {
                $.logException( e );
                return false;
            }
        }
    });

    $.fn.extend({
        notFound: function () {
            /// <signature>
            /// <summary>Check if the element has not been found in the DOM. 
            ///     typical usage : var jqElement = $(selector); if ( jqElement.notFound() ) { ... }
            ///</summary>
            /// <returns type="Boolean">Returns true if the element has not been found in the DOM.</returns>
            /// </signature>
            try {
                if (this === null) {
                    return true;
                }

                if (this === undefined) {
                    return true;
                }

                if (this.length === undefined) {
                    return true;
                }

                if (this.length === 0) {
                    return true;
                }

                return false;

            } catch (e) {
                $.logException(e);
                return false;
            }
        }
    } );

    $.fn.extend( {
        toBooleanOrDefaultFromAttribute: function ( attributeName, defaultValue ) {
            /// <signature>
            /// <summary>Get the attribute value as a boolean. 
            ///     typical usage : var jqElement = $(selector); 
            ///                     var attrValue = jqElement.toBooleanOrDefaultFromAttribute("mycustomattribute",false);
            ///</summary>
            /// <param name="attributeName" type="String">Name of the attribute.</param>
            /// <param name="defaultValue" type="Boolean">Value returned by this method when the attribute 
            ///                         has not been found or when its value is empty.</param>
            /// <returns type="Boolean">Returns the value of the attribute as boolean type.</returns>
            /// </signature>
            try {
                if ( this.notFound() ) {
                    return defaultValue;
                }

                if ( $.isNotString( attributeName ) ) {
                    return defaultValue;
                }

                var attributeValue = this.attr( attributeName );
                if ( $.isNullOrUndefinedOrEmpty( attributeValue ) ) {
                    return defaultValue;
                }

                if ( $.isNotString( attributeValue ) ) {
                    return defaultValue;
                }

                attributeValue = attributeValue.trim();

                if ( attributeValue.isNullOrEmptyOrWhitespace() ) {
                    return defaultValue;
                }

                if ( attributeValue === "true" ) {
                    return true;
                }

                return false;

            } catch ( e ) {
                $.logException( e );
                return defaultValue;
            }
        }
    } );

    $.fn.extend( {
        toIntOrDefaultFromAttribute: function ( attributeName, defaultValue ) {
            /// <signature>
            /// <summary>Get the attribute value as an integer</summary>
            /// <param name="attributeName" type="String">Name of the tag attribute</param>
            /// <param name="defaultValue" type="Number">Value to return if attribute is not found or is not in valid format, or is empty.</param>
            /// <returns type="Number">Returns the found attribute value or the defaultValue if attribute is not found or its value is not valid, or is empty.</returns>
            /// </signature>
            try {
                if ( this.notFound() ) {
                    return defaultValue;
                }

                if ( $.isNotString( attributeName ) ) {
                    return defaultValue;
                }

                var attributeValue = this.attr( attributeName );
                if ( $.isNullOrUndefinedOrEmpty( attributeValue ) ) {
                    return defaultValue;
                }

                if ( $.isNotNumber( attributeValue ) ) {
                    return defaultValue;
                }

                attributeValue = attributeValue + '';
                var intValue = attributeValue.toInt();

                return intValue;

            } catch ( e ) {
                $.logException( e );
                return defaultValue;
            }
        }
    } );

    $.fn.extend( {
        toStringOrDefaultFromAttribute: function ( attributeName, defaultValue ) {
            /// <signature>
            /// <summary>Get the attribute value as a string</summary>
            /// <param name="attributeName" type="String">Name of the tag attribute</param>
            /// <param name="defaultValue" type="Number">Value to return if attribute is not found or is not in valid format, or is empty.</param>
            /// <returns type="String">Returns the found attribute value or the defaultValue if attribute is not found or its value is not valid, or is empty.</returns>
            /// </signature>
            try {
                if ( this.notFound() ) {
                    return defaultValue;
                }

                if ( $.isNotString( attributeName ) ) {
                    return defaultValue;
                }

                var attributeValue = this.attr( attributeName );
                if ( $.isNotString( attributeValue ) ) {
                    return defaultValue;
                }

                attributeValue = attributeValue.trim();

                if ( attributeValue.isNullOrEmptyOrWhitespace() ) {
                    return defaultValue;
                }

                return attributeValue;

            } catch ( e ) {
                $.logException( e );
                return defaultValue;
            }
        }
    } );



} )( jQuery );
//end non-chained extensions


