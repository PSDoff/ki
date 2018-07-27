var base = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

base.initializeApp({
  credential: base.credential.cert(serviceAccount),
  databaseURL: "https://keg-intelligence.firebaseio.com",
  storageBucket: "keg-intelligence.appspot.com"
});

exports.db = base.database();
exports.bucket = base.storage().bucket();