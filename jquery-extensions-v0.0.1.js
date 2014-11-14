/// <reference path="Scripts/jQuery/jquery-1.11.0.js" />

///Author : Henri d'Orgeval

(function ($, undefined) {
    
    var trace = {
        logExceptionToConsole: function (ex) {
            /// <signature>
            /// <summary>Log the input exception object to the Console device.</summary>
            /// <param name="ex" type="Object">Exception object coming from the catch bloc. </param>
            /// </signature>
            try {
                if (ex === undefined) {
                    return;
                }

                if (ex === null) {
                    return;
                }

                if (console === undefined) {
                    return;
                }

                if (console.error === undefined) {
                    return;
                }

                var smalldateTime = new Date().toSmallDateTime();
                var msg = "[" + smalldateTime + "] ";

                if (ex.stack) {
                    msg += ex.stack;
                    console.error(msg);
                    return;
                }

                if (ex.message) {
                    msg += ex.message;
                }

                console.error(msg);

            } catch (e) {
                // only for debug purpose
                if (e.message) {
                    var msg = e.message;
                }
                
            }
        }
    };

    $.extensions = $.extensions || {};
    $.extensions.trace = trace;
    

})(jQuery);
