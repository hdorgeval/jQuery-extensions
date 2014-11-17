jQuery-extensions
=================

Set of extension methods for jQuery.

## trace/log API


jQuery-extensions contains a trace API that enables logging of Application errors and Exceptions to the Console Window and to a Remote Server. By default logging is done only in the Console Window.

**$.logException**

Log exception on all configured output devices (Console, Remote Server) :

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
}
```
