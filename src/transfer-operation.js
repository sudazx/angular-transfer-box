angular.module('TRANSFER_MODULE_NAME').directive('transferOperation', function() {

    return {
        restrict: 'E',
        replace: true,
        scope : {
            change : '&',
            disabled : '='
        },
        templateUrl: 'transfer/transfer-operation.html'

    };
});