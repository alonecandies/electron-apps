var app = angular.module('app', ['ngRoute']);
const {remote} = require("electron");

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: `${__dirname}/components/home/home.html`,
		controller: 'homeCtrl'
	}).when('/edit', {
		templateUrl: `${__dirname}/components/editImage/editImage.html`,
		controller: 'editCtrl'
	}).otherwise({
		template: '404 bro'
	});
});

app.controller('headCtrl',function($scope){
    var win=remote.getCurrentWindow();
    $scope.close = function() {
        win.close();
    };
    $scope.maximize = function() {
        win.isMaximized()?win.unmaximize():win.maximize();
    };
    $scope.minimize = function() {
        win.minimize();
    };
});

app.controller('homeCtrl', function($scope,$location,image){
    $scope.pickFile = function() {
        var {dialog} = remote;
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{
                name: 'Images',
                extensions: ['jpg','jpeg','png']
            }]
        }).then(function(file) {
            if (!!file) {
                var path = file.filePaths[0];
                image.setImagePath(path);
                $location.path('/edit');
                $scope.$apply();
            }
        });
    };
});

app.service('image',function(){
    var imagePath="";
    this.setImagePath = (path) => {
        imagePath = path;
    }
    this.getImagePath = () => {
        return imagePath;
    }
})

app.controller("editCtrl",function($scope,image){
    $scope.imagePath = image.getImagePath();
});