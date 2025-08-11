const admin = require('../config/firebaseConfig');
const generateJWT = require('../utils/generateToken');

exports.firebaseLogin = async (req, res) => {
  try {
    const { firebaseToken } = req.body;

    // 1. Verify Firebase token
    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    // 2. Generate custom JWT
    const customToken = generateJWT({
      uid: decoded.uid,
      email: decoded.email,
      role: decoded.role || 'user' // Custom claims
    });

    res.json({ customToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};