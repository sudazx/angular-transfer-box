angular.module('transfer/transfer-operation.html',[]).run(["$templateCache", function($templateCache) {

    $templateCache.put('transfer/transfer-operation.html',
        '<div class="transfer-operation">\n'+
        '   <button type="button" ng-disabled="disabled.target" ng-click="change({direction:\'target\'})">&lt;</button>\n'+
        '   <button type="button" ng-disabled="disabled.source" ng-click="change({direction:\'source\'})">&gt;</button>\n' +
        '</div>');

}]);