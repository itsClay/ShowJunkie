
app.controller('MainCtrl', function($scope, $rootScope, $ionicPush, $ionicUser, Artist, User, Auth, Follows, FIREBASE_URL, $firebaseArray, Notified) {
  // Push notification stuff...
    $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
      console.log('Got token', data.token, data.platform);
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
      console.log('Identifying user');

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
    var curr_email = Auth.getCurrentUser();
    console.log(curr_email)

    $scope.updateFollowing = function(artistName){

      var ref = new Firebase(FIREBASE_URL + 'following/' + artistName);
      var artistFollowing = $firebaseArray(ref);

      Notified.getFollowingArtists().then(function(followList){
        console.log(followList);

        if(followList[artistName]){
          // current user follows artist
          artistFollowing.$add(curr_email);
        } else {
          artistFollowing.$loaded().then(function(follower){
            for(var key in follower){
              if(follower[key].$value === curr_email){
                // current user unfollows artist
                artistFollowing.$remove(follower[key]);
              }
            }

          });
        }

      })
      
    };

    $scope.feedLimit = 10;

});

