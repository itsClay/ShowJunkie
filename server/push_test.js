Content-Type: application/json
X-Ionic-Application-Id: YOUR_APP_ID

// This is simply Connor's test, feel free to remove when testing is complete
{
  "tokens":[
    "APA91bGLf3WtrAVMfFZs20BziXdDjLHMesettdEzeAw_8C-SqpSJ8PRxMOi34bCNpYhBRozLoX3fSiCn59f_lcnRrjOHA-ylsQuHs-RxRLuqKJAxRvOdNYGTfg4z6F6XYBIAn1NZEYxzDDcPc_eviQ6xFUUIVKqqrgjxlyXaPGIJ8aKku-gfyls"
  ],
  "notification":{
    "alert":"Hello World!",
    "ios":{
      "badge":1,
      "sound":"ping.aiff",
      "expiry": 1423238641,
      "priority": 10,
      "contentAvailable": true,
      "payload":{
        "key1":"value",
        "key2":"value"
      }
    },
    "android":{
      "collapseKey":"foo",
      "delayWhileIdle":true,
      "timeToLive":300,
      "payload":{
        "key1":"value",
        "key2":"value"
      }
    }
  }
}