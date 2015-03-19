angular.module('starter.controllers', ['ngStorage'])

.controller('LoginCtrl', ['$scope', '$state', '$http', 'Users', '$localStorage', function($scope, $state, $http, Users, $localStorage) {
  //console.log('at login Ctrl');
    $("button#logout").hide();




    $scope.data = {};
    $scope.localLogin= function(){
      console.log('clicked localLogin');
      //Users.create({ email: $scope.data.email, password: $scope.data.password }).then(function(result){
      $http.post("http://clouie.ca/login", { email: $scope.data.email, password: $scope.data.password }).then(function(result) {


      if (result.data.status == true) {

          //successful login, in our example, we will just send an alert message
            alert("Congrats, you logged in with user ID "+result.data.user_id);

            $state.go('tab.dash');
            $("button#logout").show();

            var u_id = result.data.user_id;
            $localStorage.u_id = u_id;
            console.log(u_id);
            return u_id;
          }
      }, function(error) {
          if (error.status= 401){
            alert("the email and password doesnt match!");

          }else {
            alert("There was a problem getting your profile.  Check the logs for details.");
            console.log(error);
          }
      });
    };
    //$scope.data={};
    $scope.localSignup = function(){
      console.log('clicked localSignup');
      //Users.create({ email: $scope.data.email, password: $scope.data.password }).then(function(result){
      $http.post("http://clouie.ca/signup", { email: $scope.data.email, password: $scope.data.password }).then(function(result) {
        alert('sent to signup post request');
          console.log(result);

          if (result.data.status == true) {
      //
      //      //successful login, in our example, we will just send an alert message
            alert("Congrats, you've signed up! Your usesr ID is: " + result.data.user_id);
            $state.go('tab.dash');
            var u_id = result.data.user_id;
            console.log(u_id);
            return u_id;
          }
          }, function (error) {
            if (error.status = 401) {
              alert("the email and password doesnt match!");

            } else {
              alert("There was a problem getting your profile.  Check the logs for details.");
              console.log(error);
            }
          });
      };
    $scope.facebookLogin = function() {
      console.log('clicked facebookLogin');
      //Users.create({ email: $scope.data.email, password: $scope.data.password }).then(function(result){
      $http.post("http://clouie.ca/auth/facebook", {email: $scope.data.email}).then(function (result) {
        alert('sent to signup post request');
        console.log(result);
      })
    }
  }])

.controller('DashCtrl', ['$scope', '$http', 'Photos', 'Challenges', function($scope, $http, Photos, Challenges, u_id) {
        Photos.all().success(function(data) {
            $scope.photos = data;
            //console.log(req.body.id);
        });
      Challenges.all().success(function(data) {
        $scope.challenges = data;
      });
      $scope.activateChallenge= function(c_id){
        console.log("the user id is", u_id);
        var data = {
          'c_id': c_id
        };
        console.log("the add Challenge button was clicked");
        $http({method: 'POST', url: 'http://clouie.ca/accepted', withCredentials: true, data: data});
            console.log('posting the c_id data');

          console.log("this is challenge id", c_id);
        }

$scope.challenges = Challenges.all();
      $scope.remove = function(challenge) {
        Chats.remove(challenge);
      }
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

  .controller('PhotoCtrl', function($rootScope, $scope, $ionicPopup, $state, $http) {
    console.log('this is my first photo try');
    $rootScope.challenge ={
      name: '',
      description: ''
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
                  class: 'button-calm',
                  onTap: $rootScope.savePhoto
                  //onTap: function(){
                  //  console.log('saving photo');
                  //  alert('saving photo');
                  //  //if($rootScope.data.imageURI.match(/^data:image\/jpeg;base64,/)) {
                    //  console.log('there is a photo');
              //      }else{
              //        console.log('sdfa')
              //      }
              //    }
              //
              //
              }
          ]
        });


        //myAddChallenge.then(function (data) {
        //  $http({method: "POST", url: "http://clouie.ca/challenge2", data: data});
        //  console.log('posting the challenge data');
        //
        //  console.log('Save the challenge!', data);
        //});



    };

    $rootScope.data ={};

    // set the default image URI (a color bar image)
    //$rootScope.data.imageURI = "data:image/jpeg;base64, " + data;
    $rootScope.data.imageURI = 'http://www.arabamerica.com/wp-content/themes/arabamerica/assets/img/thumbnail-default.jpg';

    // I want to go directly here from camera button... need to think about this!



    $rootScope.takePhoto = function() {
      //have to move the state.go to right after the take photo function because we need
      //to create this view for the photo to bind to. when we had this lower, there was no
      //view for the data to bind to and this meant that the first time we took a photo it
      //showed only the default picture.
      $state.go('tab.photo-camera');

      //alert('taking picture');
      //$rootScope.data.imageURI = 'http://www.digitalartistdaily.com/users/4846/thm1024/1367367475_tiger%20small.jpg';

      var cameraOptions = {
        targetWidth: 300,
        //targetHeight: 300,
        allowEdit : true,
        destinationType: navigator.camera.DestinationType.FILE_URI
      };

      navigator.camera.getPicture(function(data) {
        //alert('after taking a photo');
        //$rootScope.data.imageURI = "data:image/jpeg;base64, " + data;
        //alert('image is: ' + data);

        //$rootScope.data.imageURI = "data:image/jpeg;base64, " + data;
        $rootScope.data.imageURI = data;

        //$rootScope.data.image = data;
        $rootScope.$apply();
          //needed to add in $apply which helps $scope deal with async events.
          //http://www.jeffryhouser.com/index.cfm/2014/6/2/How-do-I-run-code-when-a-variable-changes-with-AngularJS


          //console.log('image is: ', imageURI);

      }, function(err) {

        alert("Sorry!  Can't take your photo!");
      }, cameraOptions);


    }

    $rootScope.savePhoto = function() {
      //alert('saving photo');
      //if($rootScope.data.imageURI.match(/^data:image\/jpeg;base64,/)){
      //  alert('there is a photo');
        //check to see if there was a photo taken
        //post the image to the api
        var imageSave= $rootScope.data.imageURI;
      //alert(imageSave);
        var options = new FileUploadOptions();
        options.fileKey="photo";
        options.fileName = "camera.jpeg";
        options.mimeType="image/jpeg";
        options.headers = {"Access-Control-Allow-Credentials": "true"}
        //options.chunkedMode = false;
        var params= {
          name: $rootScope.challenge.name,
          description: $rootScope.challenge.description,
          album_id: 1,
          filename: 'camera.jpeg'
        }
        //alert(params.name);
        options.params =params;
        var ft = new FileTransfer();
      //alert($http.config);
        ft.upload(imageSave, encodeURI("http://clouie.ca/challenge"), function(result) {
            alert(result);
          //alert("after saving photo");
        },function(error){
            alert("there was a problem saving your image");
            alert(error.message);
          }, options);
        //
        //$http.post("http://clouie.ca/challenge", { image: $rootScope.data.imageURI }).then(function(result) {
        ////  alert(result.data.message);
        //}, function(error){
        //  alert("there was a problem saving your image");
        //  console.log(error);
        //});

      //}
      //else{
      //  alert('you have to take a photo first');
      //}

    }
    //
    //  $scope.showAddChallenge = function () {
    //      console.log('open the Challenge Create');
    //
    //    $scope.data = {};
    //    //
    //    var myAddChallenge = $ionicPopup.show({
    //      templateUrl: 'templates/challenge-new.html',
    //      buttons: [
    //          {text: 'Cancel'},
    //          {
    //              text:'<b>Save</b>',
    //              type: 'submit',
    //              class: 'button-calm'
    //
    //          }
    //      ]
    //    });
    //
    //
    //    myAddChallenge.then(function (data) {
    //      $http({method: "POST", url: "http://clouie.ca/challenge", data: data});
    //      console.log('posting the challenge data');
    //
    //      console.log('Save the challenge!', data);
    //    });
    //


      //};



  })

  .controller('NewPhotoCtrl', ['$scope', '$ionicPopup', '$http', 'Challenges', function($scope,$ionicPopup, $http, Challenges) {
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
      Challenges.all().success(function(data) {
      console.log(data);
      $scope.challenges = data;
      });
      //  $scope.showAddChallenge = function () {
      //    $scope.data = {};
      //
      //    var myAddChallenge = $ionicPopup.show({
      //      templateUrl: 'templates/challenge-new.html'
      //    });
      //    myAddChallenge.then(function (data) {
      //      $http({method: "POST", url: "http://clouie.ca/challenge", data: data});
      //      console.log('posting the challenge data');
      //
      //      console.log('Save the challenge!', data);
      //    });
      //
      //}
    }])

.controller('ChallengeCtrl', ['$scope', 'Challenges', '$localStorage', function($scope, Challenges, $localStorage){
  var u_id = $localStorage.u_id
  Challenges.all().success(function(data) {
    console.log(data);
    $scope.challenges = data;
  });

}])

//.controller('DropdownCtrl', function($scope, $log){
//  $scope.items = [
//    'The first choice!',
//    'And another choice for you.',
//    'but wait! A third!'
//  ];
//
//  $scope.status = {
//    isopen: false
//  };
//
//  $scope.toggled = function(open) {
//    $log.log('Dropdown is now: ', open);
//  };
//
//  $scope.toggleDropdown = function($event) {
//    $event.preventDefault();
//    $event.stopPropagation();
//    $scope.status.isopen = !$scope.status.isopen;
//  };
//
//})

.controller('WinsCtrl', ['$scope', 'Photos', 'Challenges', function($scope, Photos, Challenges){
      Photos.all().success(function(data){
        $scope.photos = data;
      });
      Challenges.all().success(function(data) {
      console.log(data);
      $scope.challenges = data;
      });
    }])

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('LogoutCtrl', ['$scope', '$state', '$localStorage', function($scope, $state, $localStorage) {
    //console.log('at login Ctrl');
    $scope.data = {};

    $scope.logout = function () {
      var u_id = $localStorage.u_id;
      $("#logout").hide();

      console.log(u_id + ' is logging out');
      delete $localStorage.u_id;

      $state.go('login');
    }
}]);

