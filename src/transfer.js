angular.module('TRANSFER_MODULE_NAME').directive('transfer', ['$timeout',function ($timeout) {

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

}]);