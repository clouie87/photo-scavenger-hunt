angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', '$http', 'Photos', 'Challenges', function($scope, $http, Photos, Challenges) {
        Photos.all().success(function(req, data) {
            $scope.photos = data;
            //console.log(req.body.id);
        });
      Challenges.all().success(function(data) {
        $scope.challenges = data;
      });
      $scope.activateChallenge= function(c_id){
        var data = {
          'c_id': c_id
        };
        console.log("the add Challenge button was clicked");
        $http({method: 'POST', url: 'http://clouie.ca/accepted', withCredentials: true, data: data});
            console.log('posting the c_id data');



        console.log("this is challenge id", c_id);

    };

//$scope.challenges = Challenges.all();
      //$scope.remove = function(challenge) {
      //  Chats.remove(challenge);
      //}
    }])




.controller('CompeteCtrl', function($scope, Challenges) {
  $scope.challenges = Challenges.all();
  $scope.remove = function(challenge) {
    Chats.remove(challenge);
  }
})

.controller('CameraCtrl', function($scope, $ionicPopup) {

        $scope.hideAddChallenge = function() {
            console.log('cancel was clicked');
            $ionicPopup.hide({
                templateUrl: 'templates/challenge-new.html'
            });
        };


    })

  .controller('PhotoCtrl', function($scope, $ionicPopup, $state, $http) {

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


    };
      $scope.showAddChallenge = function () {
          console.log('open the Challenge Create');

        $scope.data = {};
        //
        var myAddChallenge = $ionicPopup.show({
          templateUrl: 'templates/challenge-new.html',
          buttons: [
              {text: 'Cancel'},
              {
                  text:'<b>Save</b>',
                  type: 'submit',
                  class: 'button-calm'

              }
          ]
        });


        myAddChallenge.then(function (data) {
          $http({method: "POST", url: "http://clouie.ca/challenge", data: data});
          console.log('posting the challenge data');

          console.log('Save the challenge!', data);
        });



      };



  })

  .controller('NewPhotoCtrl', function($scope,$ionicPopup, $http) {
        $scope.close = function(){
            console.log('cancel was clicked');
            $scope.deactivate();
        };


      $scope.showAddPhoto = function () {
        $scope.data = {};

        var myAddPhoto = $ionicPopup.show({
          templateUrl: 'templates/photo-new.html'
        });
          $scope.close = function(){
              myAddPhoto.deactivate();
              console.log('cancel was clicked')
          };


        myAddPhoto.then(function (data) {
          $http({method: 'POST', url: 'http://clouie.ca/photo', data: data});
          console.log('posting the photo data');

          console.log('Save the photo!', data);
        });
      };
        $scope.showAddChallenge = function () {
          $scope.data = {};

          var myAddChallenge = $ionicPopup.show({
            templateUrl: 'templates/challenge-new.html'
          });
          myAddChallenge.then(function (data) {
            $http({method: "POST", url: "http://clouie.ca/challenge", data: data});
            console.log('posting the challenge data');

            console.log('Save the challenge!', data);
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
