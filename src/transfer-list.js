angular.module('TRANSFER_MODULE_NAME').directive('transferList', function () {

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