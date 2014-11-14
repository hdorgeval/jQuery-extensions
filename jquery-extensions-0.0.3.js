/// <reference path="jquery-1.11.0.js" />


///Author : Henri d'Orgeval

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
        throw new trace.notImplementedException();
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
        /// <returns type="String">Returns the string that will be showed in the Console</returns>
        /// </signature>
        try {

            trace.logExceptionToConsole(ex);

            //TODO : send exception to remote server

            //TODO : log inside specific DOM element

        } catch (e) {
            trace.logExceptionToConsole(e);
        }
    };

})(jQuery);
