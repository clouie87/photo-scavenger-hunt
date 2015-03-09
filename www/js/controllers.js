angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('CompeteCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('CameraCtrl', function($scope){
  })

.controller('WinsCtrl', function($scope){
  })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
