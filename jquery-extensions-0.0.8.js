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

    //String extension
    if ( "test".isString === undefined ) {
        String.prototype.isString = function () {
            return true;
        };
    }

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

    $.isNotString = function (input) {
        /// <signature>
        /// <summary>Check if input object is not a string.
        ///</summary>
        /// <param name="input" type="Object">Any kind of object : literal object, string, number, boolean, function, etc...</param>
        /// <returns type="Boolean">Returns true if input parameter is not a string.</returns>
        /// </signature>
        return $.isString( input ) === false;
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
    });

} )( jQuery );
//end non-chained extensions
