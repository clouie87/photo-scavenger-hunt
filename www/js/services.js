angular.module('starter.services', [])

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

.factory('Challenges', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var challenges = [{
    id: 0,
    name: 'Faye',
    lastText: 'Most pretty stained glass',
    photo: 'http://upload.wikimedia.org/wikipedia/commons/f/f2/Meaux_Vitrail_1867_30808_3.jpg'
  }, {
    id: 1,
    name: 'AJ',
    lastText: 'Happiest Fiddler',
    photo: 'http://1.bp.blogspot.com/_N3CFuFDnOUo/S8xzYii0C0I/AAAAAAAAABA/6d-idPSYvnY/s1600/A+Very+Toothy,+Very+Happy+Fiddler!+Photo+Two.jpg'
  }, {
    id: 2,
    name: 'Darren',
    lastText: 'Best action shot on the ski hill',
    photo: 'http://payload40.cargocollective.com/1/6/222050/3105035/Screen-shot-2014-03-09-at-10.19.52-AM.png'
  }, {
    id: 3,
    name: 'Darian',
    lastText: 'Cutest puppy photo',
    photo: 'https://lh3.ggpht.com/WWhVjw6kHGldtpvkfbMXYJcYf0HDIIyth3By1Kl7UAKBdo333wLQ6YNSfXGezVa3eg=h900'
  }, {
    id: 4,
    name: 'Brian',
    lastText: 'Pet that looks most like a pokemon',
    photo: 'http://www.funnypet-pictures.com/wp-content/uploads/real-life-pikachu.jpg'
  }];

  return {
    all: function() {
      return challenges;
    },
    remove: function(challenge) {
      challenges.splice(challenges.indexOf(challenge), 1);
    },
    get: function(challengeID) {
      for (var i = 0; i < challenges.length; i++) {
        if (challenges[i].id === parseInt(challengeID)) {
          return challenges[i];
        }
      }
      return null;
    }
  };
})


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
