// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($compileProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
      //this has something to do with whitelisting my photos.. i need to research this
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
    $httpProvider.defaults.withCredentials = true; //sets default to send credentials with every request
    //need to tell the serve that all the credentials are ok or else it wont deserialize my
    //user... why? I couldnt tell you. it maybe tells angular to send the cookies with each request (?)
    //$routeProvider.when('#/tab/wins/', {
    //    templateUrl: '/templates/tab-wins.html',
    //    controller: 'WinsCtrl'
    //  })



// Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
    url:"/login",
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
        }
      }
  })



  .state('tab.compete', {
      url: '/compete',
      views: {
        'tab-compete': {
          templateUrl: 'templates/tab-compete.html',
          controller: 'CompeteCtrl'
        }
      }
    })


    .state('tab.photo-camera', {
      url: '/photo/camera',
      views: {
        'tab-photo': {
          templateUrl: 'templates/photo-camera.html',
          controller: 'CameraCtrl'
        }
      }
    })

    .state('tab.photo-new', {
      url: '/photo/camera',
      views: {
        'tab-photo': {
          templateUrl: 'templates/photo-new.html',
          require: "^CameraCtrl",
          controller: 'NewPhotoCtrl'
        }
      }
    })

    .state('tab.challenge-new', {
      url: '/photo/camera',
      views: {
        'tab-photo': {
          templateUrl: 'templates/challenge-new.html',
          require: "^CameraCtrl",
          controller: 'NewPhotoCtrl'
        }
      }
    })

    .state('tab.photo', {
      url: '/photo',
      views: {
        'tab-photo': {
          //templateUrl: 'templates/tab-camera.html',
          controller: 'PhotoCtrl'
        }
      }
    })

  .state('tab.wins', {
    url: '/wins',
      reload: true,
      reloadOnSearch: true,

    views: {
      'tab-wins': {
        templateUrl: '/templates/tab-wins.html',
        controller: 'WinsCtrl',
        reload: true
      }
    }
  })



      .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/login');

});
