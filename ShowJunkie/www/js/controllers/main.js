
app.controller('MainCtrl', function($scope, $rootScope, $ionicPush, $ionicUser, Artist, User, Auth, Follows, Notified) {
  // Push notification stuff...
    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      // console.log('Got token', data.token, data.platform);
    });
    //Basic registration
    $scope.pushRegister = function() {
      alert('Registering...');

      $ionicPush.register({
        canShowAlert: false,
        onNotification: function(notification) {
          // Called for each notification for custom handling
          $scope.lastNotification = JSON.stringify(notification);
        }
      }).then(function(deviceToken) {
        $scope.token = deviceToken;
      });
    }
    $scope.identifyUser = function() {
      alert('Identifying');
      // console.log('Identifying user');

      var user = $ionicUser.get();
      if(!user.user_id) {
        // Set your user_id here, or generate a random one
        user.user_id = $ionicUser.generateGUID()
      };

      angular.extend(user, {
        name: 'Test User',
        message: 'I come from planet Ion'
      });

      $ionicUser.identify(user);
      
    }

    $scope.artists = Artist.allArtists;

    // create object with artist name as key, value as true/false if following
    Notified.getFollowingArtists().then(function(artistUserFollows){
      $scope.followingArtists = artistUserFollows;
    });

    var curr_email = Auth.getCurrentUser().password.email;

    $scope.updateFollowing = function(artistName){
      Notified.getFollowingArtists()
        .then(function(artistUserFollows){
          
          // toggle scope map
          $scope.followingArtists = artistUserFollows;
          $scope.followingArtists[artistName] = !artistUserFollows[artistName];

          // toggle in firebase
          if(artistUserFollows[artistName]){
            Follows.followArtist(artistName, curr_email);
          } else {
            Follows.unfollowArtist(artistName, curr_email);
          }

          // update event count
          Notified.getEventsForArtists(artistUserFollows).then(function(events_for_user){
            $rootScope.myEvents = events_for_user;
            $rootScope.count = events_for_user.length;
          })
        });
      
    };

    $scope.feedLimit = 10;

});

