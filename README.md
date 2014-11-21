jQuery-extensions
=================

Set of extension methods for jQuery.

## trace/log API


jQuery-extensions contains a trace API that enables logging of Application errors and Exceptions to the Console Window and to a Remote Server. 

By default logging is done only in the Console Window. To send JavaScript exceptions and application errors to a remote server you must call the $.initTrace(options) method (see below).

**$.logException( ex )**

Log exception on all configured output devices (Console, Remote Server).

Example: 

```javascript
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



**$.initTrace( options )**

Initialize and Configure the trace API.

options : literal object containing general settings of the trace API. The default options are :

```javascript
options = {
        sendToRemote: false,
        remoteUrl: null,
        interceptAjaxErrors: false
    }
```

Example:

```javascript
$.initTrace ({
        sendToRemote: true,
        remoteUrl: 'http://contoso.com/api/log',
        interceptAjaxErrors: true
    });
```

## Core extensions

jQuery-extensions contains utility methods that are used by the trace API and by other extensions. These jQuery basic utilities are the core extensions of this library.

**$.isNullOrUndefinedOrEmpty( input )**

**$.isNotNullOrUndefinedOrEmpty( input )**

Check if input object is (or is not) either null or undefined or empty.

input : Any kind of object : literal object, string, number, boolean, function, etc...

Examples:

```javascript
$.isNullOrUndefinedOrEmpty(""); //true
$.isNullOrUndefinedOrEmpty({}); //true
$.isNullOrUndefinedOrEmpty([]); //true
$.isNullOrUndefinedOrEmpty(" "); //false
```


**$.isString( input )**

**$.isNotString( input )**

Check if input object is (or is not) a string.

input : Any kind of object : literal object, string, number, boolean, function, etc...

Examples:

```javascript
$.isString(""); //true
$.isString(function(){}); //false
```


**$.isNotFunction( input )**

Check if input object is not a function.

input : Any kind of object : literal object, string, number, boolean, function, etc...

Examples:

```javascript
$.isNotFunction(""); //true
$.isNotFunction(function(){}); //false
$.isNotFunction(function(){} + ''); //true
```


**$.getQueryStringData( )**

Get the query string of the current web page url as a literal object.


**$.getQueryStringData( url )**

Get the query string from input url as a literal object.

Example:

```javascript
$.getQueryStringData("http://contoso.com?a=1&b=2"); 
// will output { a:1, b:2 }
```


## Non-Chained extensions

jQuery-extensions contains jQuery methods that enables to get non-jQuery data from the jQuery object. Hence these methods cannot be chained with standard jQuery methods.

**.found()**

Check if the element has been found in the DOM.

Example:

```javascript
var jqElement = $(selector); 
if ( jqElement.found() ) { ... }
```

**.notFound()**

Check if the element has not been found in the DOM.

Example:

```javascript
var jqElement = $('#not-existing-element'); 
if ( jqElement.notFound() ) { 
    //use trace API to let the developer know there is a regression or that page content is not correct  
    $.logError( {
                message: "Cannot find element with selector : '#not-existing-element'",
                info: "Check that HTML content is correctly setup.",
                otherInfo: "Check data tags are correctly setup on element #not-existing-element"
            } );
    }
```

