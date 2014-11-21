/// <reference path="../../Scripts/qunit-1.15.0.js" />
/// <reference path="../../Scripts/jquery-1.11.0.js" />
/// <reference path="../qunit-extensions-0.0.1.js" />


( function ( QUnit, undefined ) {
    var moduleName =  "jquery-extensions.js must not override existing code in jQuery" ;

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

    QUnit.isolatedTest(moduleName,"jQuery v1.11.1 object must not have a property called extensions", 
                        getEmptyFrameContentWithJS(["http://code.jquery.com/jquery-1.11.1.min.js"]),
                        "jQuery", function (assert,isolatedWindow) {
        //Arrange
        var testObject;

        //Act
        testObject = isolatedWindow.$.extensions;

        //Assert
        var successMessage = "jQuery library does not contain a property called extensions.";
        var errorMessage = "jQuery library contains a property called extensions.";
        if ( testObject !== undefined && testObject.toString ) {
            errorMessage += " jQuery.extensions = '" + testObject.toString() + "'";
        }
        var msg = successMessage;
        if ( testObject !== undefined ) {
            msg = errorMessage;
        }
        assert.deepEqual( testObject, undefined, msg );

                        } );



    QUnit.isolatedTest(moduleName, "jQuery v2.1.1 object must not have a property called extensions",
                        getEmptyFrameContentWithJS( ["http://code.jquery.com/jquery-2.1.1.min.js"] ),
                        "jQuery", function ( assert, isolatedWindow ) {
        //Arrange
        var testObject;

        //Act
        testObject = isolatedWindow.$.extensions;

        //Assert
        var successMessage = "jQuery library does not contain a property called extensions.";
        var errorMessage = "jQuery library contains a property called extensions.";
        if ( testObject !== undefined && testObject.toString ) {
            errorMessage += " jQuery.extensions = '" + testObject.toString() + "'";
        }
        var msg = successMessage;
        if ( testObject !== undefined ) {
            msg = errorMessage;
        }
        assert.deepEqual( testObject, undefined, msg );

                        } );



    QUnit.isolatedTest( moduleName, "jQuery v1.11.1 object must not have a method called $.isNullOrUndefinedOrEmpty()",
                        getEmptyFrameContentWithJS( ["http://code.jquery.com/jquery-1.11.1.min.js"] ),
                        "jQuery", function ( assert, isolatedWindow ) {
                            //Arrange
                            var testObject;

                            //Act
                            testObject = isolatedWindow.$.isNullOrUndefinedOrEmpty;

                            //Assert
                            var successMessage = "jQuery library does not contain $.isNullOrUndefinedOrEmpty()";
                            var errorMessage = "jQuery library contains $.isNullOrUndefinedOrEmpty()";
                            if ( testObject !== undefined && testObject.toString ) {
                                errorMessage += " jQuery.isNullOrUndefinedOrEmpty = '" + testObject.toString() + "'";
                            }
                            var msg = successMessage;
                            if ( testObject !== undefined ) {
                                msg = errorMessage;
                            }
                            assert.deepEqual( testObject, undefined, msg );

                        } );



    QUnit.isolatedTest( moduleName, "jQuery v2.1.1 object must not have a method called $.isNullOrUndefinedOrEmpty()",
                        getEmptyFrameContentWithJS( ["http://code.jquery.com/jquery-2.1.1.min.js"] ),
                        "jQuery", function ( assert, isolatedWindow ) {
                            //Arrange
                            var testObject;

                            //Act
                            testObject = isolatedWindow.$.isNullOrUndefinedOrEmpty;

                            //Assert
                            var successMessage = "jQuery library does not contain $.isNullOrUndefinedOrEmpty()";
                            var errorMessage = "jQuery library contains $.isNullOrUndefinedOrEmpty()";
                            if ( testObject !== undefined && testObject.toString ) {
                                errorMessage += " jQuery.isNullOrUndefinedOrEmpty = '" + testObject.toString() + "'";
                            }
                            var msg = successMessage;
                            if ( testObject !== undefined ) {
                                msg = errorMessage;
                            }
                            assert.deepEqual( testObject, undefined, msg );

                        } );



    QUnit.isolatedTest( moduleName, "jQuery v1.11.1 object must not have a method called $.getQueryStringData()",
                       getEmptyFrameContentWithJS( ["http://code.jquery.com/jquery-1.11.1.min.js"] ),
                       "jQuery", function ( assert, isolatedWindow ) {
                           //Arrange
                           var testObject;

                           //Act
                           testObject = isolatedWindow.$.getQueryStringData;

                           //Assert
                           var successMessage = "jQuery library does not contain $.getQueryStringData()";
                           var errorMessage = "jQuery library contains $.getQueryStringData()";
                           if ( testObject !== undefined && testObject.toString ) {
                               errorMessage += " jQuery.getQueryStringData = '" + testObject.toString() + "'";
                           }
                           var msg = successMessage;
                           if ( testObject !== undefined ) {
                               msg = errorMessage;
                           }
                           assert.deepEqual( testObject, undefined, msg );

                       } );



    QUnit.isolatedTest( moduleName, "jQuery v2.1.1 object must not have a method called $.getQueryStringData()",
                        getEmptyFrameContentWithJS( ["http://code.jquery.com/jquery-2.1.1.min.js"] ),
                        "jQuery", function ( assert, isolatedWindow ) {
                            //Arrange
                            var testObject;

                            //Act
                            testObject = isolatedWindow.$.getQueryStringData;

                            //Assert
                            var successMessage = "jQuery library does not contain $.getQueryStringData()";
                            var errorMessage = "jQuery library contains $.getQueryStringData()";
                            if ( testObject !== undefined && testObject.toString ) {
                                errorMessage += " jQuery.getQueryStringData = '" + testObject.toString() + "'";
                            }
                            var msg = successMessage;
                            if ( testObject !== undefined ) {
                                msg = errorMessage;
                            }
                            assert.deepEqual( testObject, undefined, msg );

                        } );



    QUnit.isolatedTest(moduleName, "jQuery v1.11.1 object must not have a method called $.isString()",
                       getEmptyFrameContentWithJS(["http://code.jquery.com/jquery-1.11.1.min.js"]),
                       "jQuery", function (assert, isolatedWindow) {
                           //Arrange
                           var testObject;

                           //Act
                           testObject = isolatedWindow.$.isString;

                           //Assert
                           var successMessage = "jQuery library does not contain $.isString()";
                           var errorMessage = "jQuery library contains $.isString()";
                           if (testObject !== undefined && testObject.toString) {
                               errorMessage += " jQuery.isString = '" + testObject.toString() + "'";
                           }
                           var msg = successMessage;
                           if (testObject !== undefined) {
                               msg = errorMessage;
                           }
                           assert.deepEqual(testObject, undefined, msg);

                       });



    QUnit.isolatedTest(moduleName, "jQuery v2.1.1 object must not have a method called $.isString()",
                        getEmptyFrameContentWithJS(["http://code.jquery.com/jquery-2.1.1.min.js"]),
                        "jQuery", function (assert, isolatedWindow) {
                            //Arrange
                            var testObject;

                            //Act
                            testObject = isolatedWindow.$.isString;

                            //Assert
                            var successMessage = "jQuery library does not contain $.isString()";
                            var errorMessage = "jQuery library contains $.isString()";
                            if (testObject !== undefined && testObject.toString) {
                                errorMessage += " jQuery.isString = '" + testObject.toString() + "'";
                            }
                            var msg = successMessage;
                            if (testObject !== undefined) {
                                msg = errorMessage;
                            }
                            assert.deepEqual(testObject, undefined, msg);

                        });



    QUnit.isolatedTest(moduleName, "jQuery v1.11.1 object must not have a method called $.isNotString()",
                      getEmptyFrameContentWithJS(["http://code.jquery.com/jquery-1.11.1.min.js"]),
                      "jQuery", function (assert, isolatedWindow) {
                          //Arrange
                          var testObject;

                          //Act
                          testObject = isolatedWindow.$.isNotString;

                          //Assert
                          var successMessage = "jQuery library does not contain $.isNotString()";
                          var errorMessage = "jQuery library contains $.isNotString()";
                          if (testObject !== undefined && testObject.toString) {
                              errorMessage += " jQuery.isNotString = '" + testObject.toString() + "'";
                          }
                          var msg = successMessage;
                          if (testObject !== undefined) {
                              msg = errorMessage;
                          }
                          assert.deepEqual(testObject, undefined, msg);

                      });



    QUnit.isolatedTest(moduleName, "jQuery v2.1.1 object must not have a method called $.isNotString()",
                        getEmptyFrameContentWithJS(["http://code.jquery.com/jquery-2.1.1.min.js"]),
                        "jQuery", function (assert, isolatedWindow) {
                            //Arrange
                            var testObject;

                            //Act
                            testObject = isolatedWindow.$.isNotString;

                            //Assert
                            var successMessage = "jQuery library does not contain $.isNotString()";
                            var errorMessage = "jQuery library contains $.isNotString()";
                            if (testObject !== undefined && testObject.toString) {
                                errorMessage += " jQuery.isNotString = '" + testObject.toString() + "'";
                            }
                            var msg = successMessage;
                            if (testObject !== undefined) {
                                msg = errorMessage;
                            }
                            assert.deepEqual(testObject, undefined, msg);

                        });


    QUnit.isolatedTest(moduleName, "jQuery v1.11.1 object must not have a method called $.isNotFunction()",
                      getEmptyFrameContentWithJS(["http://code.jquery.com/jquery-1.11.1.min.js"]),
                      "jQuery", function (assert, isolatedWindow) {
                          //Arrange
                          var testObject;

                          //Act
                          testObject = isolatedWindow.$.isNotFunction;

                          //Assert
                          var successMessage = "jQuery library does not contain $.isNotFunction()";
                          var errorMessage = "jQuery library contains $.isNotFunction()";
                          if (testObject !== undefined && testObject.toString) {
                              errorMessage += " jQuery.isNotFunction = '" + testObject.toString() + "'";
                          }
                          var msg = successMessage;
                          if (testObject !== undefined) {
                              msg = errorMessage;
                          }
                          assert.deepEqual(testObject, undefined, msg);

                      });



    QUnit.isolatedTest(moduleName, "jQuery v2.1.1 object must not have a method called $.isNotFunction()",
                        getEmptyFrameContentWithJS(["http://code.jquery.com/jquery-2.1.1.min.js"]),
                        "jQuery", function (assert, isolatedWindow) {
                            //Arrange
                            var testObject;

                            //Act
                            testObject = isolatedWindow.$.isNotFunction;

                            //Assert
                            var successMessage = "jQuery library does not contain $.isNotFunction()";
                            var errorMessage = "jQuery library contains $.isNotFunction()";
                            if (testObject !== undefined && testObject.toString) {
                                errorMessage += " jQuery.isNotFunction = '" + testObject.toString() + "'";
                            }
                            var msg = successMessage;
                            if (testObject !== undefined) {
                                msg = errorMessage;
                            }
                            assert.deepEqual(testObject, undefined, msg);

                        });


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

