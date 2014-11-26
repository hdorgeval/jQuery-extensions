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


**$.isNumber( input )**

**$.isNotNumber( input )**

Check if input object is (or is not) a number.

input : Any kind of object : literal object, string, number, boolean, function, etc...

Examples:

```javascript
$.isNumber(2); //true
$.isNumber("2"); //true
$.isNumber("2a"); //false
$.isNumber(true); //false
```


**$.isInt( input )**

**$.isNotInt( input )**

Check if input object is (or is not) an integer.

input : Any kind of object : literal object, string, number, boolean, function, etc...

Examples:

```javascript
$.isInt(2); //true
$.isInt(2.1); //false
$.isInt("2"); //true
$.isInt("2.1"); //false
```


**$.isArrayEx ( input )**

**$.isNotArray( input )**

Check if input object is (or is not) an array.

input : Any kind of object : literal object, string, number, boolean, function, etc...

Examples:

```javascript
$.isArrayEx([]); //true
$.isArrayEx([1,2]); //true
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


## Async extensions

jQuery-extensions contains utility methods that are used to execute JavaScript code asynchronously in order to free the UI thread.

Special credit to Ben Vinegar and Anton Kovalyov authors of the book : Third-Party JavaScript (Manning Press).
The Async extensions are inspired by their work.

**$.executeAsync( context, f, delay, asyncKey )**

Execute asynchrounously input function f.

context : Object that will be used to set the this keyword for method f.

f : Function that will be called asynchronously.

delay : Number of milliseconds to wait before calling the function f.

asyncKey : A key that is used to debounce the call of the function f. For example, if method f is called asynchronously at a frequency < delay, the call to the method f is deferred until the call frequency become > delay. Usefull when listening to events that are raised at a very high speed like a scroll event.

Examples:

```javascript
$.executeAsync(this,f); // <=> setTimeout( function () { f.call( this );}, 0 );

$(window).scroll(function (event) {
    $.executeAsync(event, myFunction, 100, "scrollWindow");
});
```

**$.executeAsyncLoopOnArray( options )**

Execute a loop asynchronously. At each iteration the thread is released and the UI thread can still process user actions.

options : Literal object that holds all callbacks and the input array. This object has the following signature:

```javascript
options = {
    input,          //input array on which to execute the asynchronous for loop
    processItem,    //The callback that is called at each iteration
                    //The callback must have the following signature function(i,item){} where i is the loop counter and item is input[i].
    context,        //The object that will be accessible within the callbacks with the this keyword.
    onStart,        //The callback that will be called once before the loop starts.
    onProgress,     //The callback that will be called at each iteration to enable the caller to update the DOM with a progress bar
    onEnd,          //The callback that will be called when all iterations are done.
    cancel,         //The callback that will be called at each iteration to check if the loop must be canceled due to external business conditions.
                    // The cancel callback must have the following signature : function(i,item){} where i is the loop counter and item is input[i].
                    // The cancel callback must return true of false.
    onCanceled      //The callback that will be called if the loop has been canceled
}
```

Examples:

```javascript
$.executeAsyncLoopOnArray( {
    input : [1,2,3],
    processItem : function( i, item ){ ... },
    context : this,
    onStart : function() { ... },
    onProgress : function( i,itemsCount ){ ... }, //itemsCount = number of elements in input array.
    onEnd : function() { ... },
    cancel : function ( i, item ){ ... },
    onCanceled : function() { ... }
});

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


**.toBooleanOrDefaultFromAttribute( attributeName, defaultValue )**

Get the attribute value of a DOM element as a boolean.

attributeName : Name of the attribute.

defaultValue : Value returned by this method when the attribute has not been found or when its value is empty.

Example:

```javascript
var jqElement = $(selector); 
var attrValue = jqElement.toBooleanOrDefaultFromAttribute("mycustomattribute",false); //= true or false
```



**.toIntOrDefaultFromAttribute( attributeName, defaultValue )**

Get the attribute value of a DOM element as an integer.

attributeName : Name of the attribute.

defaultValue : Value returned by this method when the attribute has not been found or when its value is empty.

Example:

```javascript
var jqElement = $(selector); 
var attrValue = jqElement.toIntOrDefaultFromAttribute("mycustomattribute",0); //= 0 or the attribute value as an integer
```

**.toStringOrDefaultFromAttribute( attributeName, defaultValue )**

Get the attribute value of a DOM element as a string.

attributeName : Name of the attribute.

defaultValue : Value returned by this method when the attribute has not been found or when its value is empty.

Example:

```javascript
var jqElement = $(selector); 
var attrValue = jqElement.toStringOrDefaultFromAttribute("mycustomattribute","myValue"); //= "myValue" or the attribute value as a string
```
