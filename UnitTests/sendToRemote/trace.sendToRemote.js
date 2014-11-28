/// <reference path="../../Scripts/qunit-1.15.0.js" />
/// <reference path="../../Scripts/jquery-1.11.0.js" />
/// <reference path="../../Scripts/jquery-extensions-0.1.5.js" />



( function ( QUnit, undefined ) {

    QUnit.module( "$.extensions.trace.sendToRemote" );
    
    QUnit.test( "$.extensions.trace.sendToRemote is defined", function ( assert ) {
        //Arrange
        var testObject;

        //Act
        testObject = $.extensions.trace.sendToRemote;

        //Assert
        var successMessage = "$.extensions.trace.sendToRemote is defined";
        var errorMessage = "$.extensions.trace.sendToRemote is not defined. Check JS file jquery-extensions-x.y.z.js is correctly loaded in the page.";
        
        var msg = successMessage;
        if (testObject === undefined) {
            msg = errorMessage;
        }

        assert.notDeepEqual(testObject, undefined, msg);
    });

    QUnit.test( "$.extensions.trace.sendToRemote is a method", function ( assert ) {
        //Arrange
        var testObject;

        //Act
        testObject = $.extensions.trace.init;

        //Assert
        var result = false;
        var successMessage = "$.extensions.trace.sendToRemote is a method";
        var errorMessage = "$.extensions.trace.sendToRemote is not defined as a function.";

        var msg = errorMessage;
        if (typeof testObject === 'function') {
            result = true;
            msg = successMessage;
        }

        assert.deepEqual(result, true, msg);
    });


    QUnit.test( "encodeURIComponent is a method", function ( assert ) {
        //Arrange
        var testObject;

        //Act
        testObject = encodeURIComponent;

        //Assert
        var result = false;
        var successMessage = "encodeURIComponent is a method";
        var errorMessage = "encodeURIComponent is not defined as a function.";

        var msg = errorMessage;
        if ( typeof testObject === 'function' ) {
            result = true;
            msg = successMessage;
        }

        assert.deepEqual( result, true, msg );
    } );
    
    QUnit.test( "JSON.stringify is a method", function ( assert ) {
        //Arrange
        var testObject;

        //Act
        testObject = JSON.stringify;

        //Assert
        var result = false;
        var successMessage = "JSON.stringify is a method";
        var errorMessage = "JSON.stringify is not defined as a function.";

        var msg = errorMessage;
        if ( typeof testObject === 'function' ) {
            result = true;
            msg = successMessage;
        }

        assert.deepEqual( result, true, msg );
    } );

    QUnit.test( "JSON.stringify returns a json string", function ( assert ) {
        //Arrange
        var testObject = {message:'test'};
        var expectedResult = '{"message":"test"}';

        //Act
        var result = testObject = JSON.stringify(testObject);

        //Assert
        var successMessage = "JSON.stringify has correctly generated the json string";
        var errorMessage = "JSON.stringify dis not correctly generated the json string";

        var msg = errorMessage;
        if ( result === expectedResult ) {
            msg = successMessage;
        }

        assert.deepEqual( result, expectedResult, msg );
    } );

    QUnit.test( "JSON.stringify returns 'null' when input is null", function ( assert ) {
        //Arrange
        var testObject = null;
        var expectedResult = 'null';

        //Act
        var result = testObject = JSON.stringify( testObject );

        //Assert
        var successMessage = "JSON.stringify has correctly generated the json string";
        var errorMessage = "JSON.stringify dis not correctly generated the json string";

        var msg = errorMessage;
        if ( result === expectedResult ) {
            msg = successMessage;
        }

        assert.deepEqual( result, expectedResult, msg );
    } );

    QUnit.test( "JSON.stringify returns '{}' when input is empty literal object", function ( assert ) {
        //Arrange
        var testObject = {};
        var expectedResult = '{}';

        //Act
        var result = testObject = JSON.stringify( testObject );

        //Assert
        var successMessage = "JSON.stringify has correctly generated the json string";
        var errorMessage = "JSON.stringify dis not correctly generated the json string";

        var msg = errorMessage;
        if ( result === expectedResult ) {
            msg = successMessage;
        }

        assert.deepEqual( result, expectedResult, msg );
    } );

} )( QUnit );


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






