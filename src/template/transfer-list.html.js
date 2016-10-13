angular.module('transfer/transfer-list.html',[]).run(["$templateCache", function($templateCache) {

    $templateCache.put('transfer/transfer-list.html',
        '<div class="transfer-list">\n'+
        '   <div class="transfer-list-header">\n'+
        '       <span class="transfer-checkbox" ng-click="headerCheck();" ng-class="{checked :\'transfer-checkbox-checked\',indeterminate : \'transfer-checkbox-indeterminate\'}[getHeaderState()]">\n'+
        '           <span class="transfer-checkbox-inner"></span>\n'+
        '       </span>\n'+
        '       <span class="transfer-list-header-selected">\n'+
        '           <span>\n'+
        '               <span ng-hide="getCheckedNumber() == 0">\n'+
        '                   <span ng-bind="getCheckedNumber()"></span>\n'+
        '                   <span>/</span>\n'+
        '               </span>\n'+
        '               <span ng-bind="items.length"></span>\n'+
        '               <span>items</span>\n'+
        '           </span>\n'+
        '           <span class="transfer-list-header-title" ng-bind="title"></span>\n'+
        '       </span>\n'+
        '   </div>\n'+
        '   <div class="transfer-list-body" ng-class="{\'transfer-list-body-with-search\':showSearch}">\n'+
        '       <div class="transfer-list-search-wrapper" ng-if="showSearch">\n'+
        '           <div>\n'+
        '               <input class="transfer-list-search" placeholder="{{::searchPlaceholder}}" ng-init="searchContent" ng-keyup="searchKeyUp($event)"/>\n'+
        '               <span class="transfer-list-search-action">\n'+
        '                   <i class="fa fa-search" ng-if="!searchContent"></i>\n'+
        '                   <i class="fa fa-close" ng-if="searchContent" ng-click="clearSearch();" style="cursor: pointer"></i>\n'+
        '               </span>\n'+
        '           </div>\n'+
        '       </div>\n'+
        '       <ul class="transfer-list-content">\n'+
        '           <li ng-repeat="listItem in items track by listItem.item.key" ng-click="toggleItem(listItem);" class="transfer-list-content-item" ng-class="{\'highlight\':listItem.highlight}" ng-hide="showSearch && !listItem.show">\n'+
        '               <span class="transfer-checkbox" ng-class="{\'transfer-checkbox-checked\': listItem.selected}">\n'+
        '                   <span class="transfer-checkbox-inner"></span>\n'+
        '               </span>\n'+
        '               <span ng-bind="innerRender(listItem)"></span>\n'+
        '           </li>\n'+
        '           <div class="transfer-list-not-found" ng-bind="notFoundContent" ng-if="showNotFound"></div>\n'+
        '       </ul>\n'+
        '   </div>\n'+
        '</div>\n');
}]);