
app.controller('MainCtrl', function($scope, $rootScope, $ionicPush, $ionicUser, Artist, currentAuth) {
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

});

