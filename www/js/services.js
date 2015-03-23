angular.module('starter.services', [])

.factory('ActiveChallenges', ['$http', function ActiveChallengesFactory($http){
    //var currentState = true;

    return {

      all: function () {
        return $http({
          method: 'GET',
          url: 'http://clouie.ca/accepted/'
        });
      }
    }

    //

  }])

.directive('iconSwitcher', function(){

  return{
    link: function(scope, elem, attrs) {
      var currentState = attrs.state;
      console.log(scope, elem, attrs);

      elem.on('click', function () {
        console.log('clicked!');

        if (currentState === 'off') {
          console.log('it is on!');
          angular.element(elem).removeClass(attrs.iconOff);
          angular.element(elem).data('state', 'on');
          angular.element(elem).addClass(attrs.iconOn);
        //} else {
        //  console.log('it is off');
        //  angular.element(elem).removeClass(attrs.iconOn);
        //  angular.element(elem).data('state', 'off');
        //  angular.element(elem).addClass(attrs.iconOff);

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
    //get: function () {
    //  return users[userId];
    //}
  }
  //  get: function(u_id) {
  //   for(var i = 0; user < object.length; ++user){
  //    //console.log(object[user]);
  //    if(object[user].u_id === u_id){
  //      console.log(object[user]);
  //      //data = object[user];
  //      $scope.challenges = object[user];
  //    }
  //  }
  //};
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

  .factory('Accepteds', ['$http', function AcceptedsFactory($http) {
    // Might use a resource here that returns a JSON array
    return {
      all: function () {
        return $http({
          method: 'GET',
          url: 'http://clouie.ca/accepted/'
        });
      }
    }
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
