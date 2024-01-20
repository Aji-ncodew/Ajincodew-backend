const admin = require("firebase-admin");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRecord = await admin.auth().getUserByEmail(email);

    // Check the provided password against the user's stored password hash
    if (password === process.env.apiKey) {
      // req.session.user = userRecord.uid;
      return res.send("Login successful");
    } else {
      return res.status(401).send("Login failed pass");
    }
  } catch (error) {
    console.error("Error getting user:", error);
    return res.status(401).send("Login failed");
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    console.log("Successfully created user:", userRecord.uid);
    return res.send("User registered successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).send("User registration failed");
  }
};
