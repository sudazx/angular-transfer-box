#Angular Transfer Box

This plugin was createed to address a common demand that select some data from a list with search and other helpful functions. Aspired by famous [React-ANTD](https://ant.design/docs/react/introduce 'antd-docs') which contains a transfer box also, this plugin was written with angular to achieve the similar effect.

*Requirement:* AngularJS 1.3+

*File Size:* v1.0.0

* *js:* raw 12.28kb, minfied 6.7kb
* *css:* 4.47kb

#Usage

1. npm install angular-transfer-box 

2. include angular-transfer-box as a dependency for your app

	angular.module('yourApp',['angular-transfer-box'])
	
3. include the supplied CSS file (or create your own).

4.	Setup the directive and reference an object on your scope

Javascript:

	$scope.dataSource = [{key:'item1',key:'item2',key:'item3'}];
	$scope.targetKeys = [];
	
HTML:

	<transfer origin-source="dataSource"
				target-keys="targetKeys"
				show-search="true"
				></transfer>
				
Then your will see the magic scene, like this:

![demo.png](https://github.com/sudazx/zero-public-image/blob/master/angular-transfer-box-demo.png?raw=true)

#Demo

run `npm install`, then open the dist/index.html


#License

Licensed under the [GNU](http://www.gnu.org/licenses/).


 
    
