/// <reference path="../../Scripts/qunit-1.15.0.js" />
/// <reference path="../../Scripts/jquery-1.11.0.js" />
/// <reference path="../qunit-extensions-0.0.1.js" />


( function ( QUnit, undefined ) {

    var getEmptyFrameContentWithJS = function ( jsUrls ) {
        var htmlContent = [];
        htmlContent.push( '<html>' );
        htmlContent.push( '<head>' );

        var jsUrlsCount = jsUrls.length;
        for ( var i = 0; i < jsUrlsCount; i++ ) {
            htmlContent.push( '<script src="' + jsUrls[i] + '"></script>' );
        }
        htmlContent.push( '</head>' );
        htmlContent.push( '<body>' );
        htmlContent.push( '</body>' );
        htmlContent.push( '</html>' );
        var iframeContent = htmlContent.join( ' ' );
        return iframeContent;
    }

    QUnit.isolatedTest("jQuery v1.11.1 object must not have a property called extensions", 
                        getEmptyFrameContentWithJS(["http://code.jquery.com/jquery-1.11.1.min.js"]),
                        "jQuery", function (assert,isolatedWindow) {
        //Arrange
        var testObject;

        //Act
        testObject = isolatedWindow.$.extensions;

        //Asert
        var successMessage = "jQuery library does not contain a property called extensions.";
        var errorMessage = "jQuery library contains a property called extensions.";
        if ( testObject !== undefined && testObject.toString ) {
            errorMessage += " jQuery.extensions = '" + myObject.toString() + "'";
        }
        var msg = successMessage;
        if ( testObject !== undefined ) {
            msg = errorMessage;
        }
        assert.deepEqual( testObject, undefined, msg );

                        } );

    QUnit.isolatedTest( "jQuery v2.1.1 object must not have a property called extensions",
                        getEmptyFrameContentWithJS( ["http://code.jquery.com/jquery-2.1.1.min.js"] ),
                        "jQuery", function ( assert, isolatedWindow ) {
        //Arrange
        var testObject;

        //Act
        testObject = isolatedWindow.$.extensions;

        //Asert
        var successMessage = "jQuery library does not contain a property called extensions.";
        var errorMessage = "jQuery library contains a property called extensions.";
        if ( testObject !== undefined && testObject.toString ) {
            errorMessage += " jQuery.extensions = '" + myObject.toString() + "'";
        }
        var msg = successMessage;
        if ( testObject !== undefined ) {
            msg = errorMessage;
        }
        assert.deepEqual( testObject, undefined, msg );

    } );

} )( QUnit );


//QUnit.test("jQuery object must not have a property called extensions", function (assert) {
//    //Arrange
//    var testObject;

//    //Act
//    testObject = $.extensions;

//    //Asert
//    var successMessage = "jQuery library does not contain a property called extensions.";
//    var errorMessage = "jQuery library contains a property called extensions.";
//    if (testObject !== undefined && testObject.toString) {
//        errorMessage += " jQuery.extensions = '" + myObject.toString() + "'";
//    }
//    var msg = successMessage;
//    if (testObject !== undefined) {
//        msg = errorMessage;
//    }
//    assert.deepEqual(testObject, undefined, msg);
//} );

