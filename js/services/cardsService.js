'use strict'

app.factory('cardsScreenService', function ($http, $templateCache, $location, $rootScope, Base64Service) {

    function sortDifferenceAscending(a, b) {

        return a.diffToCurrent - b.diffToCurrent;
    };

    return {


        processSvg: function (data, mainImageName, pdfFileName, emailGeneratedPdf, emailTo, nameOfTheRecipient, callback) {
            $http.post('api/pdfOut/createSvgData.php', {
                svgData: data,
                imageName:mainImageName,
                pdfName:pdfFileName,
                sendEmail:emailGeneratedPdf,
                userEmail:emailTo,                
                recipientName:nameOfTheRecipient                
            }, { timeout: 50000 }).success(
                function (response) {
                    callback(response)
                }).error(function (error) {
                    callback(error)
                })
        },
        
        downloadPdf: function (pdfFileName, callback) {
            $http.get('api/pdfOut/download.php', { 
                pdfName:pdfFileName
            }).success(
                function (response) {
                    callback(response)
                })
        }

    }

});