angular.module('starter.services', [])

.factory('ActiveChallenges', ['$http', function ActiveChallengesFactory($http){
    //var currentState = true;

    return {

      all: function () {
        return $http({
          method: 'GET',
          url: 'http://clouie.ca/accepted/'
        });
      },
      isActive: function(c_id){

      }
    }

    //

  }])

.directive('iconSwitcher', function(){

  return{
    link: function(scope, elem, attrs) {
      var currentState = attrs.state;
      //console.log(scope, elem, attrs);

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

  .directive('likeSwitcher', function(){

  return{
    link: function(scope, elem, attrs) {
      var currentState = attrs.state;
      //console.log(scope, elem, attrs);

      elem.on('click', function () {
        console.log('clicked!');

        if (currentState === 'off') {
          console.log('it is on!');
          angular.element(elem).removeClass(attrs.iconOff);
          angular.element(elem).data('state', 'on');
          angular.element(elem).addClass(attrs.iconOn);
        } else {
          console.log('it is off');
          angular.element(elem).removeClass(attrs.iconOn);
          angular.element(elem).data('state', 'off');
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

.factory('Challenges', ['$http', '$timeout', function ChallengesFactory($http, $timeout) {
  // Might use a resource here that returns a JSON array
  var challenges ={};
  return {
    all: function () {
      return $http({
        method: 'GET',
        url: 'http://clouie.ca/challenge/'
      });

    },
    timer: function(data){
      //var data = [];
      console.log('this is the beginning of my timer function tool: ', data[0]);

      var interval = setInterval(function (){
      for (var i= 0; i < data.length; i++) {
        var dateCreated = Date.parse(data[i].created_on);
        var todayDate = Date.now();
        var difference = todayDate - dateCreated;

        //var dateMade = data[i].created_on;
        //console.log(dateMade);
        //var dateNow = Date.now(todayDate);
        //console.log(dateNow);

        //console.log(todayDate.toDateString());
        data[i].difference = difference;
        //var data2 = data[i];

        if(difference <= 604800000){
          //var data[i] = data2;
          //console.log(data[i]);
          //console.log('the difference is', difference);
          //var differenceDay= (604800/(60*60*24));
          //console.log('one week is : '+ parseInt(differenceDay));

          var j = ((604800000-difference)/1000);

            //console.log(j, 'seconds left');
            j--; // Take one away from i
            //console.log('j', j);
            var differenceDays = (j / (60 * 60 * 24));
            var differenceHours = (j /  (60 * 60)%24);
            var differenceMinutes = (j / (60)%60);
            var differenceSeconds = (j) % 60;

            var day = parseInt(differenceDays);
            var hours = parseInt(differenceHours);
            var minutes = parseInt(differenceMinutes);
            var seconds = parseInt(differenceSeconds);


            data[i].days = parseInt(differenceDays);
            data[i].hours = parseInt(differenceHours);
            data[i].minutes = parseInt(differenceMinutes);
            data[i].seconds = parseInt(differenceSeconds);
            if (i == 0) {
              console.log(data[i].days, ' days ', data[i].hours, ' hours ', data[i].minutes, ' minutes and ', data[i].seconds, ' seconds');
            }

            //console.log('days, ', (j / (60 * 60 * 24)));
            //console.log('days, ', day);
            //console.log('hours, ', hours);
            //console.log('minutes, ', minutes);
            //console.log('seconds, ', seconds);

            if (j === 0) {
              clearInterval(interval); // Stop the interval
            }
          //console.log('the j, ', j);
          //var differenceSeconds = (j) % 60;
          //var differenceDays = (j / (60 * 60 * 24));
          //var differenceHours = (j /  (60 * 60)%24);
          //var differenceMinutes = (j / (60)%60);
          //data[i].seconds = parseInt(differenceSeconds);
          //data[i].days = parseInt(differenceDays);
          //data[i].hours = parseInt(differenceHours);
          //data[i].minutes = parseInt(differenceMinutes);
          //var seconds = parseInt(differenceSeconds);
          //console.log('seconds ', data[i].seconds);
          //console.log(data[i].days);
          //console.log(data[i].hours);
          //console.log(data[i].minutes);

          data[i].isOver = false;
        } else{
          //console.log('these challenges are done: ', data[i].name);
          data[i].isOver = true;
          data[i].day = "Challenge is Over";
        }

      }
      }, 10000);
      //return data;


    },

    //timeout: function(timerData){
    //  console.log('the time out is running');
    //  var counter = [];
    //  for(var i = 0; i < timerData.length; i++) {
    //
    //      if (timerData[i].isOver === false) {
    //        this.counter = timerData[i];
    //        console.log('the counter is set to ', this.counter);
    //
    //        this.counter--;
    //        console.log(this.counter);
    //
    //      }
    //
    //    }
    //    return timerData;
    //
    //    //return counter;
    //
    //
    //},

    check: function (data) {
        for (var i = 0; i < data.length; i++) {
          console.log('testing the challenges data');
          data[i].isActive = false;
        }
      return data;

    },

    getActive: function(challengeData, data){
      console.log('in the active function');
      for (var i = 0; i < data.length; i++) {
      //console.log(challengeData[i]);
        for(var j=0; j< challengeData.length; j++){
          if (data[i].c_id === challengeData[j].c_id) {
            console.log('the challenge ids match between the ActiveChallenges and all challenges for this user', challengeData[j].u_id);
            console.log('these challenges are already active', challengeData[j].c_id);

            challengeData[j].isActive = true;
            console.log(challengeData);
          }
        }
      }

      return challengeData;

    }
  }

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

  .factory('Votes', ['$http', function VotesFactory($http) {
    // Might use a resource here that returns a JSON array

    return {
      all: function () {
        return $http({
          method: 'GET',
          url: 'http://clouie.ca/vote/'
        })
      },

      save: function (id) {
        var data = {
          'p_id': id
        };
        console.log('vote was clicked', data);
        return $http({
          method: 'POST',
          url: 'http://clouie.ca/vote',
          data: data
        });
      },

      check: function(voteData){
        console.log('in the check function');
        for (var i = 0; i < voteData.length; i++) {
          console.log('testing the challenges data', i);
          voteData[i].hasVoted = true;
        }
        return voteData;

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
    },
    check: function(challengeID) {
        return $http({
          method: 'GET',
          url: 'http://clouie.ca/photo/' + challengeID
        });
      }
    //getVoted: function(data, voteData) {
    //  for (var i = 0; i < data.length; i++) {
    //    data[i].hasVoted = false;
    //    console.log(data[i]);
    //    for (var j = 0; j < voteData.length; j++) {
    //      data[j].hasVoted = true;
    //      console.log(data[j]);
    //    }
    //  }
    //}

      //console.log(data, voteData);
    //get: function(photoDescription) {
    //    // Simple index lookup
    //    return photos[photoDescription];
    //}
  }

}]);
