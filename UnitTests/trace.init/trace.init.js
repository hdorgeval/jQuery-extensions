/// <reference path="../../Scripts/qunit-1.15.0.js" />
/// <reference path="../../Scripts/jquery-1.11.0.js" />
/// <reference path="../../Scripts/jquery-extensions-0.1.4.js" />



( function ( QUnit, undefined ) {

    QUnit.module( "$.extensions.trace.init" );
    
    QUnit.test("$.extensions.trace.init is defined", function (assert) {
        //Arrange
        var testObject;

        //Act
        testObject = $.extensions.trace.init;

        //Assert
        var successMessage = "$.extensions.trace.init is defined";
        var errorMessage = "$.extensions.trace.init is not defined. Check JS file jquery-extensions-x.y.z.js is correctly loaded in the page.";
        
        var msg = successMessage;
        if (testObject === undefined) {
            msg = errorMessage;
        }

        assert.notDeepEqual(testObject, undefined, msg);
    });

    QUnit.test("$.extensions.trace.init is a method", function (assert) {
        //Arrange
        var testObject;

        //Act
        testObject = $.extensions.trace.init;

        //Assert
        var result = false;
        var successMessage = "$.extensions.trace.init is a method";
        var errorMessage = "$.extensions.trace.init is not defined as a function.";

        var msg = errorMessage;
        if (typeof testObject === 'function') {
            result = true;
            msg = successMessage;
        }

        assert.deepEqual(result, true, msg);
    });

    QUnit.test("$.extensions.trace.init call with no parameters must not modify default options", function (assert) {
        //Arrange
        var testObject = $.extensions.trace.options;
        var expectedObject = $.extensions.trace.defaultOptions;

        //Act
        $.extensions.trace.init();
        testObject = $.extensions.trace.options;

        //Assert
        var successMessage = "$.extensions.trace.init does not modify default options when called with no parameters";
        var errorMessage = "$.extensions.trace.init does modify default options when called with no parameters";

        var msg = errorMessage;
        if (testObject === expectedObject) {
            result = true;
            msg = successMessage;
        }

        assert.deepEqual(testObject, expectedObject, msg);
    });

    QUnit.test( "$.extensions.trace.init call with undefined must not modify default options", function ( assert ) {
        //Arrange
        var testObject = $.extensions.trace.options;
        var expectedObject = $.extensions.trace.defaultOptions;

        //Act
        $.extensions.trace.init(undefined);
        testObject = $.extensions.trace.options;

        //Assert
        var successMessage = "$.extensions.trace.init does not modify default options when called with undefined";
        var errorMessage = "$.extensions.trace.init does modify default options when called with undefined";

        var msg = errorMessage;
        if ( testObject === expectedObject ) {
            result = true;
            msg = successMessage;
        }

        assert.deepEqual( testObject, expectedObject, msg );
    } );

    QUnit.test( "$.extensions.trace.init call with null must not modify default options", function ( assert ) {
        //Arrange
        var testObject = $.extensions.trace.options;
        var expectedObject = $.extensions.trace.defaultOptions;

        //Act
        $.extensions.trace.init( null );
        testObject = $.extensions.trace.options;

        //Assert
        var successMessage = "$.extensions.trace.init does not modify default options when called with null";
        var errorMessage = "$.extensions.trace.init does modify default options when called with null";

        var msg = errorMessage;
        if ( testObject === expectedObject ) {
            result = true;
            msg = successMessage;
        }

        assert.deepEqual( testObject, expectedObject, msg );
    } );

    QUnit.test( "$.extensions.trace.init call with empty literal object must not modify default options", function ( assert ) {
        //Arrange
        var testObject = $.extensions.trace.options;
        var expectedObject = $.extensions.trace.defaultOptions;

        //Act
        $.extensions.trace.init( {} );
        testObject = $.extensions.trace.options;

        //Assert
        var successMessage = "$.extensions.trace.init does not modify default options when called with empty literal object";
        var errorMessage = "$.extensions.trace.init does modify default options when called with empty literal object";

        var msg = errorMessage;
        if ( testObject === expectedObject ) {
            result = true;
            msg = successMessage;
        }

        assert.deepEqual( testObject, expectedObject, msg );
    } );


} )( QUnit );


function myFunction (event) {
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






