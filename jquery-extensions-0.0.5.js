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

    extensions.isNotNullOrUndefinedOrEmpty = function () {
        return extensions.isNullOrUndefinedOrEmpty() === false;
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
    

})(jQuery);

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
        remoteUrl: null
    };

    trace.options = $.extend({}, trace.defaultOptions);

    trace.init = function (options) {
        /// <signature>
        /// <summary>Override predefined options to customize the behavior of the trace API.</summary>
        /// <param name="options" type="Object">Literal object</param>
        /// <returns type="void"></returns>
        /// </signature>

        trace.options = $.extend( {}, trace.defaultOptions,options );

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

    trace.sendExceptionToRemote = function ( ex ) {
        /// <signature>
        /// <summary>Log the input exception object to a remote server. 
        ///          Remote server Url is defined in $.extensions.trace.options.remoteUrl property</summary>
        /// <param name="ex" type="Object">Exception object coming from the catch bloc. </param>
        /// <returns type="String">Returns the string that will be sent to the remote server</returns>
        /// </signature>
        try {
            //check if sending messages to remote server is enabled
            if ( trace.remoteLoggingIsNotEnabled() ) {
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

            var content = JSON.stringify( ex );
            var requestUrl = remoteUrl;
            requestUrl += '?ex=' + encodeURIComponent( content );
            var img = new Image();
            img.src = requestUrl;

        } catch ( e ) {
            trace.logExceptionToConsole( e );
        }
    };

    $.initTrace = function (options) {
        /// <signature>
        /// <summary>Override predefined options to customize the behavior of the trace API.
        ///          This method is a shortcut for $.extensions.trace.init(options);
        ///</summary>
        /// <param name="options" type="Object">Literal object with the following signature:
        ///             {
        ///                sendToRemote: false,
        ///                remoteUrl: null
        ///            };
        ///</param>
        /// <returns type="void"></returns>
        /// </signature>
        throw new trace.notImplementedException();
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

            //TODO : send exception to remote server

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

            //TODO : remote logging

            //TODO : log inside specific DOM element

        } catch ( e ) {
            trace.logExceptionToConsole( e );
        }
    };


    

})(jQuery);
