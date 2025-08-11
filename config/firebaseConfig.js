const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Firebase admin key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;