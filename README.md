#Angular Transfer Box

Angular Transfer Box was created to address a common demand that choose some data from a list-like collection. Aspired by famous [React-ANTD](https://ant.design/docs/react/introduce 'antd-docs') which contains a [transfer box](https://ant.design/components/transfer/) also, angular-transfer-box was written with angular to achieve the similar effect.

*Requirement:* AngularJS 1.3+

*File Size:* v1.2.0

* *js:* raw 14.1kb, minfied 7.28kb
* *css:* 5.18kb

#Installation

`npm install angular-transfer-box --save-dev`

#Demo

* change your current workspace to `node_modules/angular-transfer-box`

* open the `demo/index.html`

#Principle

angular-transfer-box composed by two transfer-list components and a transfer-operation component. Each transfer-list can display its data and transfer-operation can move data between these two list.

angular-transfer-box can only handle array-collection data source. Each item in this data source should contains a property `key` that would be used to keep its unique. Thus, a regular data source that angular-transfer-box will success render should conform to the following format:

	var dataSource = [{
		key : '1' or 1 // string or number,
		otherProperty : ...
	}];


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
				target-keys="targetKeys">
	</transfer>
				
Then your will see the magic scene, like this:

![demo.png](https://github.com/sudazx/zero-public-image/blob/master/angular-transfer-box-demo.png?raw=true)

#Options

angular-transfer-box support several kinds of settings with specify an obj `option`.

	// define an option in  your controller
	var transferBoxOption = {
		showSearch : true
	}
	// in your template
	<transfer origin-source="dataSource"
				target-keys="targetKeys"
				option="transferBoxOption">
	</transfer>
		

`angular-transfer-box` supports the following options:

* `orientation(String)`: the orientation between the transfer list, can be specified with `"horizontal(default)"` or `"vertical"`
* `render(Function)`: if you pass a complicated business-logic object into angular-tranfer-box, you may need this option to render what's you want. For example,

		var dataSource = [{
			key : '1',
			topic : {
				name : 'sport',
				id : '1'
			}
		},{
			key : '2',
			topic : {
				name : 'music',
				id : '2'
			}
		}]
		//we can use render to show topic.name in each transfer-list
		var option = {
			render : function(obj){
				return obj.topic.name;
			}	
		}	
		
	default

		render = functon(obj){
			return obj.key;
		}
* `titles(Object)`: specified the `title` in each list, default

		titles : {
			origin : 'Source List',
			target : 'Target List'
		}
* `showSearch(Boolean)`: toggle the search component in angular-transfer-box, default: `true`
* `searchPlaceholder(String)`: set the placeholder content of search input, default: `"Please enter your content"`
* `notFoundContent(String)`: set the empty list content, default: `"Not Found"`
* `classes(String)`: you can set this option to customize your styles, default: `""` 
	


#License

Licensed under the [GNU](http://www.gnu.org/licenses/).


 
    
