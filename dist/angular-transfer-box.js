angular.module('angular-transfer-box',['transfer/transfer.html','transfer/transfer-list.html','transfer/transfer-operation.html']);

angular.module('angular-transfer-box').directive('transferList', function () {

    return {

        restrict: 'E',

        replace: true,

        scope: {
            items: '=',
            showSearch : '=',
            title: '@',
            searchPlaceholder : '@',
            notFoundContent : '@',
            render: '&'
        },

        templateUrl: 'transfer/transfer-list.html',

        link: function (scope,elem) {

            if (!angular.isArray(scope.items)) {
                throw Error('Transfer List need a data list.');
            }

            scope.render = scope.render();

            /**
             *  Control the render of data item
             */
            scope.innerRender = function (dataItem) {

                if (angular.isFunction(scope.render)) {
                    return scope.render(dataItem.item);
                }
                return dataItem.item;
            };

            scope.selectAll = function (selected) {
                selected = selected || false;
                scope.items.forEach(function (dataItem) {
                    dataItem.selected = selected;
                });
            };

            scope.toggleItem = function (item) {
                item.selected = !item.selected;
            };

            scope.headerCheck = function(){
                var state = scope.getCheckedNumber() < scope.items.length;
                scope.selectAll(state);
            };

            scope.getHeaderState = function(){
                var checkedNumber = scope.getCheckedNumber();
                return checkedNumber === 0 ? "unchecked" :
                    (checkedNumber == scope.items.length ? "checked" : "indeterminate");
            };

            scope.getCheckedNumber = function () {
                return scope.items.reduce(function (pv, cv) {
                    return cv.selected ? (pv + 1) : pv;
                }, 0);
            };


            function updateNotFound(){
                scope.showNotFound = !scope.items.some(function(dataItem){
                    return showItem(dataItem);
                });
            }

            function updateItems(){

                scope.items.forEach(function(item){
                    item.show = showItem(item);
                });

            }

            function showItem(dataItem){
                var searchString = scope.searchContent;
                return !searchString || scope.innerRender(dataItem).indexOf(searchString) !== -1;
            }

            scope.$watch('items',updateNotFound,true);

            if(scope.showSearch){

                scope.clearSearch = function(){
                    scope.searchContent = '';
                    angular.element(elem).find('.transfer-list-search').val(scope.searchContent);
                    updateItems();
                };

                scope.searchKeyUp = function($evt){
                    scope.searchContent = angular.element($evt.target).val();
                    updateItems();
                };
            }

        }
    };

});
angular.module('angular-transfer-box').directive('transferOperation', function() {

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
angular.module('angular-transfer-box').directive('transfer', function ($timeout) {

    return {

        restrict: 'E',

        replace: true,

        scope: {
            originSource: '=',
            targetKeys: '=',
            option : '='
        },

        templateUrl: 'transfer/transfer.html',

        link: function (scope) {

            var defaultOption = {
                orientation: 'horizontal',
                render : function(item){
                    return item.key;
                },
                titles : {
                    origin : 'Source List',
                    target : 'Target List'
                },
                showSearch : true,
                searchPlaceholder : 'Please enter your content',
                notFoundContent : 'Not Found',
                classes : ''
            };

            scope.option = deepAssign({},defaultOption,scope.option);

            scope.targetSource = [];

            scope.source = [];

            scope.disabled = {
                left: false,
                right: false
            };

            scope.onChange = function (direction) {

                var tobemove = null, target = null;

                console.info(direction);

                switch (direction.toLowerCase()) {
                    case "source" :
                        tobemove = scope.source;
                        target = scope.targetSource;
                        break;
                    case "target":
                        tobemove = scope.targetSource;
                        target = scope.source;
                        break;
                }

                if (tobemove && target) {
                    move(tobemove, target);
                }

            };

            scope.$watch('originSource', function () {

                scope.targetSource = wrapper(scope.originSource.filter(function (item) {
                    return scope.targetKeys && scope.targetKeys.indexOf(item.key) !== -1;
                }));

                scope.source = wrapper(scope.originSource.filter(function (item) {
                    return unwrapper(scope.targetSource).indexOf(item) === -1;
                }));

            });

            /**
             * update the state of operation buttons
             */
            scope.$watch('targetSource', function () {
                scope.disabled.target = scope.targetSource.every(function (item) {
                    return !item.selected;
                });
            }, true);

            scope.$watch('source', function () {
                scope.disabled.source = scope.source.every(function (item) {
                    return !item.selected;
                });
            }, true);

            /**
             * wrapper data with a custom field selected
             */
            function wrapper(dataArray) {

                return dataArray.map(function (obj) {
                    return {
                        selected: false,
                        item: obj,
                        show: true
                    };
                });
            }

            function unwrapper(dataArray) {
                return dataArray.map(function (obj) {
                    return obj.item;
                });
            }

            /**
             * move the data into the target array
             * @param moveDataArray
             * @param targetDataArray
             */
            function move(moveDataArray, targetDataArray) {
                var moveArray = [];

                for (var i = moveDataArray.length - 1; i >= 0; i--) {
                    var item = moveDataArray[i];
                    if (item.selected) {
                        moveArray.push(item);

                        moveDataArray.splice(i, 1);
                    }
                }

                moveArray.forEach(function (item) {
                    item.selected = false;
                    item.highlight = true;
                    targetDataArray.unshift(item);
                });

                updateTargetKeys();

                $timeout(function () {
                    moveArray.forEach(function (item) {
                        item.highlight = false;
                    });
                }, 150);
            }

            function updateTargetKeys() {

                while (scope.targetKeys.length > 0) {
                    scope.targetKeys.shift();
                }

                unwrapper(scope.targetSource).forEach(function (item) {
                    scope.targetKeys.push(item.key);
                });
            }

            function deepAssign(target){

                var hasOwnProperty = Object.prototype.hasOwnProperty;

                function toObject(val){
                    if (val === null || val === undefined) {
                        throw new TypeError('Cannot convert undefined or null to object');
                    }

                    return Object(val);
                }

                function assignKey(to, from, key){
                    var val = from[key];

                    if (val === undefined || val === null) {
                        return;
                    }

                    if (hasOwnProperty.call(to, key)) {
                        if (to[key] === undefined || to[key] === null) {
                            throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
                        }
                    }

                    if (!hasOwnProperty.call(to, key) || !angular.isObject(val)) {
                        to[key] = val;
                    } else {
                        to[key] = assign(Object(to[key]), from[key]);
                    }
                }

                function assign(to,from){
                    if (to === from) {
                        return to;
                    }

                    from = Object(from);

                    for (var key in from) {
                        if (hasOwnProperty.call(from, key)) {
                            assignKey(to, from, key);
                        }
                    }

                    return to;
                }


                target = toObject(target);

                for (var s = 1; s < arguments.length; s++) {
                    assign(target, arguments[s]);
                }

                return target;
            }

        }
    };

});
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
angular.module('transfer/transfer-operation.html',[]).run(["$templateCache", function($templateCache) {

    $templateCache.put('transfer/transfer-operation.html',
        '<div class="transfer-operation">\n'+
        '   <button type="button" ng-disabled="disabled.target" ng-click="change({direction:\'target\'})">&lt;</button>\n'+
        '   <button type="button" ng-disabled="disabled.source" ng-click="change({direction:\'source\'})">&gt;</button>\n' +
        '</div>');

}]);
angular.module('transfer/transfer.html',[]).run(["$templateCache", function($templateCache) {

    $templateCache.put('transfer/transfer.html',
        '<div class="transfer {{::option.classes}} {{::option.orientation}}">\n'+
        '   <transfer-list items="source" render="option.render" title="{{::option.titles.origin}}" show-search="option.showSearch" search-placeholder="{{::option.searchPlaceholder}}" not-found-content="{{::option.notFoundContent}}">\n'+
        '   </transfer-list>\n'+
        '   <transfer-operation change="onChange(direction)" disabled="disabled">\n'+
        '   </transfer-operation>\n'+
        '   <transfer-list items="targetSource" render="option.render" title="{{::option.titles.target}}" show-search="option.showSearch" search-placeholder="{{::option.searchPlaceholder}}" not-found-content="{{::option.notFoundContent}}">\n'+
        '   </transfer-list>\n'+
        '</div>\n');

}]);