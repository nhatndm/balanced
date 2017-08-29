angular.module('app', [])
  .controller('mainController',function($scope, $http){
    let fetchData = function(){
      $http.get('/api/data').then(function(response){
        $scope.list = response.data.list;
        $scope.port = response.data.port;
      }, function(){
        $scope.list = [];
      })
    }

    $scope.postData = function() {
      let data = {
        name: $scope.name
      }
      $http.post('/api/data', data).then(function(response){
        $scope.list = response.data;
        $scope.name = '';
      }, function(){
        $scope.list = [];
      })
    }
    fetchData();
  });
