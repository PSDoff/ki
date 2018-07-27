var base = require("firebase-admin");
var serviceAccount = require("../config/serviceAccountKey.json");

base.initializeApp({
  credential: base.credential.cert(serviceAccount),
  databaseURL: "https://keg-intelligence.firebaseio.com"
});

db = base.database();

module.exports = db;