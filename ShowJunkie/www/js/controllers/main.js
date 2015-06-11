
app.controller('MainCtrl', function($scope, $rootScope, $ionicPush, $ionicUser, Artist, User, Auth, FIREBASE_URL, $firebaseObject) {
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




    // Display artists stuff...
    var artistIds = [];

    // add artist to firebase base on list of spotify ids
    artistIds.forEach(function(artistId){
      Artist.getFromSpotify(artistId).then(function(res){
        var artist = {
          name: res.name,
          genres: res.genres,
          images: res.images
        };

        Artist.addToFirebase(artist);

      });
    }); 

    $scope.artists = Artist.allArtists;

    $scope.followArtist = function(artistName){
      return User.getCurrentUserSnapshot()
        .on("value", function(snapshot){
          // gets current user
          var userObj = snapshot.val();

          for(var userId in userObj){
            
            // refernece current user's data in firebase
            var thisUserRef = new Firebase(FIREBASE_URL + 'users/' + userId);
            var user = $firebaseObject(thisUserRef);

            // create new following list
            var following = angular.copy(userObj[userId].following);
            following.push(artistName);
            user.following = following;

            console.log(following);

            // send updated following list to firebase
            user.$save();

          }
        });
    };

    $scope.getAllFollowing = function(artistName){
      return User.getFollowing();
    };    

});

