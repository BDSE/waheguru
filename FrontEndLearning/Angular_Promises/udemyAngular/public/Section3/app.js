//only one object in global namespace....
var myApp = angular.module('firstAngularApp', ['ngMessages']);

myApp.controller('mainController', ['$scope', '$log', function ($scope, $log) {
	$log.log("Hello log service.. ");
	console.log($scope);
	console.log($log);
	alert("testing webstorm debug");
}]);

console.log(myName.name);

console.log(myName.age);