jQuery-extensions
=================

Set of extension methods for jQuery.

## trace/log API


jQuery-extensions contains a trace API that enables logging of Application errors and Exceptions to the Console Window and to a Remote Server. By default logging is done only in the Console Window.

**$.logException( ex )**

Log exception on all configured output devices (Console, Remote Server).

Example: 

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

**$.logError( err )**

Log Application error on all configured output devices (Console, Remote Server).

err : literal object that is like { message : "xxx", info : "ttt" }. Every property of this literal object will be rendered in the ouptut device.

Example:

```javascript
function myFunction () {
    try {
        if ( $("#not-existing-element").length === 0) {
            $.logError( {
                message: "Cannot find element with selector : '#not-existing-element'",
                info: "Check that HTML content is correctly setup.",
                otherInfo: "Check data tags are correctly setup on element #not-existing-element"
            } );
        }
    } catch ( e ) {
        $.logException( e );
    }
}
```

The generated output will be :

```javascript
[2014/11/17 15:24:27] [message: Cannot find element with selector : '#not-existing-element'] [info: Check that HTML content is correctly setup.] [otherInfo: Check data tags are correctly setup on element #not-existing-element] [callerName: myFunction]  jquery-extensions.js:169
trace.logErrorToConsole jquery-extensions.js:169
$.logError jquery-extensions.js:261
myFunction trace.init.js:144
```
