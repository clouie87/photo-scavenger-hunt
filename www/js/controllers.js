angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CompeteCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('CameraCtrl', function($scope) {

})

  .controller('PhotoCtrl', function($scope, $state) {

    // set the default image URI (a color bar image)
    $scope.imageURI = 'http://www.arabamerica.com/wp-content/themes/arabamerica/assets/img/thumbnail-default.jpg';

    // I want to go directly here from camera button... need to think about this!
    $scope.takePhoto = function() {

      var cameraOptions = {
        targetWidth: 300,
        targetHeight: 300,
        allowEdit : true
      };

      navigator.camera.getPicture(function(imageURI) {

        $scope.imageURI = imageURI;
        $state.go('tab.photo-camera');

      }, function(err) {

        alert("Sorry!  Can't take your photo!");
      }, cameraOptions);
    }
  })


.controller('WinsCtrl', ['$scope', 'Photos', function($scope, Photos){
      Photos.all().success(function(data){
        $scope.photos = data;
      });
    }])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
