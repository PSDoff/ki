var base = require("firebase-admin");
var serviceAccount = require(`../config/firebase/${config.firebase.name}.json`);

base.initializeApp({
  credential: base.credential.cert(serviceAccount),
  databaseURL: `https://${config.firebase.name}.firebaseio.com`,
  storageBucket: `${config.firebase.name}.appspot.com`
});

exports.db = base.database();
exports.bucket = base.storage().bucket();