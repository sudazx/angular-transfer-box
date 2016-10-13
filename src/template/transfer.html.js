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