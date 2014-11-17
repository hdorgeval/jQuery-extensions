jQuery-extensions
=================

Set of extension methods for jQuery.

trace/log API
=============

jQuery-extensions contains a trace API that enables logging of Application errors and Exceptions to the Console Window and to a remote server. By default logging is done only in the Console Window.

**$.logException**

```
function myFunction () {
    try {
        var test = "";
        if ( test.isString() ) {
            // do something;
        }
    } catch ( e ) {
        $.logException( e );
    }
};
```
