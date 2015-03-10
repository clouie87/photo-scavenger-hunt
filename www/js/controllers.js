angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Challenges) {
      $scope.challenges = Challenges.all();
      $scope.remove = function(challenge) {
        Chats.remove(challenge);
      }
    })

.controller('ButtonCtrl', function($scope){
      $scope.tab=1;
      $scope.selectTab=function(setTab) {
        $scope.tab = setTab;
      };
      $scope.isSelected=function(checkTab){
        return $scope.tab===checkTab;
        console.log(checkTab, " is selected");
      };
})
    .controller('categorySelect', function(category){
      return{

      }
    })


.controller('CompeteCtrl', function($scope, Challenges) {
  $scope.challenges = Challenges.all();
  $scope.remove = function(challenge) {
    Chats.remove(challenge);
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
        console.log('image is: ', imageURI);
        $state.go('tab.photo-camera');
        console.log('image is: ', imageURI);

      }, function(err) {

        alert("Sorry!  Can't take your photo!");
      }, cameraOptions);
    }
  })

  .controller('NewPhotoCtrl', function($scope,$ionicPopup, $http) {


    $scope.showAddPhoto = function () {
      $scope.data={};

      var myAddPhoto = $ionicPopup.show({
        templateUrl: 'templates/photo-new.html'
      });


      myAddPhoto.then(function (data) {
        $http({method: 'POST', url: 'http://clouie.ca/photo', data: data});
        console.log('posting the photo data');

        console.log('Save the photo!', data);
      });
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
