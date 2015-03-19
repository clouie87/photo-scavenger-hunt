angular.module('starter.services', [])

.directive('iconSwitcher', function(){

  return{
  restrict: 'A',
    link: function(scope, elem, attrs) {
      var currentState = true;

      elem.on('click', function () {
        console.log('clicked!');

        if (currentState === true) {
          console.log('it is on!');
          angular.element(elem).removeClass(attrs.iconOff);
          angular.element(elem).addClass(attrs.iconOn);
        } else {
          console.log('it is off');
          angular.element(elem).removeClass(attrs.iconOn);
          angular.element(elem).addClass(attrs.iconOff);

        }
        currentState = !currentState;
      })
    }
  }
})

.factory('Users', ['$http', function UsersFactory($http) {
    var users = {};
    return {
      all: function () {
        return $http({
          method: 'GET',
          url: 'http://clouie.ca/users/'
        });
      },
      create: function () {
        return $http({
          method: "POST",
          url: "http://clouie.ca/login",

          //data: user

          //{
          //email: $scope.data.email,
          //password: $scope.data.password
          //}
        })
      },
      //}
      get: function (userId) {
        return users[userId];
      }
    };
  //}
}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('Challenges', ['$http', function ChallengesFactory($http) {
  // Might use a resource here that returns a JSON array
  return {
    all: function () {
      return $http({
        method: 'GET',
        url: 'http://clouie.ca/challenge/'
      });
    }
    //get: function() {
    //
    //  }

  };
  //  },
  //  remove: function(challenge) {
  //    challenges.splice(challenges.indexOf(challenge), 1);
  //  },
  //  get: function(challengeID) {
  //    for (var i = 0; i < challenges.length; i++) {
  //      if (challenges[i].id === parseInt(challengeID)) {
  //        return challenges[i];
  //      }
  //    }
  //    return null;
  //  }
  //};
}])


.factory('Photos', ['$http', function PhotoFactory($http) {

  return {
    all: function() {
      return $http({
        method:'GET',
        url:'http://clouie.ca/photo/'
      });
    }
    //get: function(photoDescription) {
    //    // Simple index lookup
    //    return photos[photoDescription];
    //}
  };

}]);
