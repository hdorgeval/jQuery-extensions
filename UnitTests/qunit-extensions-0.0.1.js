/// <reference path="jquery-1.11.0.js" />
/// <reference path="../Scripts/qunit-1.15.0.js" />


///Author : Henri d'Orgeval

//Qunit extensions
( function ( QUnit, undefined ) {
    
    if ( QUnit === undefined || QUnit.test === undefined ) {
        return;
    }

    QUnit.isolatedTest = function (moduleName, testName, iframeContent, waitForObjectWithName, callback ) {
        var iframe = document.createElement( 'iframe' );
        iframe.style.position = 'absolute';
        iframe.style.top = '-2000px';
        document.body.appendChild( iframe );
        var isolatedWin = iframe.contentWindow;
        var isolatedDoc = isolatedWin.document;

        isolatedDoc.write( iframeContent );
        isolatedDoc.close();

        var interval = setInterval( function () {
            if ( isolatedWin[waitForObjectWithName] === undefined ) {
                // iframe content is not yet fully loaded
                return;
            }

            clearInterval( interval );
            var expected = null;
            var async = false;
            
            if ( moduleName ) {
                QUnit.module( moduleName );
            }

            QUnit.test( testName, expected, function ( assert ) {
                callback.call( this, assert, isolatedWin );
            }, async );

            document.body.removeChild( iframe );

        }, 10 );

    };

} )( QUnit);
