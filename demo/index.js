angular.module('angular-transfer-demo',['angular-transfer-box'])
    .controller('demoCtrl',function($scope){

        $scope.dataSource = [];

        $scope.targetKeys = [];

        for(var i =0; i<10;i++){
            var item = {
                key : (i+1),
                title : 'content'+(i+1),
                status : Math.random()*2 > 1
            };

            $scope.dataSource.push(item);

            if(item.status){
                $scope.targetKeys.push(item.key);
            }
        }

        $scope.transferBoxOption = {

            orientation : 'vertical',

            render : function(item){
                return item.title;
            },
            titles : {
                origin : '源列表',
                target : '目标列表'
            },
            showSearch : true,
            //classes : '',
            searchPlaceholder : '请输入搜索内容',
            notFoundContent : '找不到东西'

        };


});