#Show Junkie

An application that will notify users when their favorite artists will have a show coming to town.

1. Allows a user to login with email / password
2. Allow user to select artist Preferences / Likes
3. Get notified when an artist will be playing in a nearby upcoming show.

instructions:

```
$ git clone <repo_url>
$ cd ShowJunkie/ShowJunkie # Change into the ionic app
$ bower install # Install client side dependencies
$ ionic serve
$ cd server
$ npm install
```



generate key tool:
```
$ keytool -exportcert alias_name -storepass showjunkie -keystore my-release-key.keystore | openssl sha1 -binary | openssl base64
```

get your ios emulator device codes:
```
$ instruments -s devices
$ tail -f ~/Library/Logs/CoreSimulator/<DEVICE_CODE>/system.log
```

so android can connect to internet:
`ionic plugin add https://github.com/apache/cordova-plugin-whitelist.git`