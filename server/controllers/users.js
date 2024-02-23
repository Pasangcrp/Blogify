const userRouter = require(`express`).Router();
const bcrypt = require(`bcrypt`);
const User = require(`../models/user`);
const jwt = require(`jsonwebtoken`);
const { fetchUser } = require("../utils/middleware");

//!Default Route
userRouter.get("/", (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(next);
});

//!Registering Users
userRouter.post(`/register`, async (req, res, next) => {
  const { name, username, email, password } = req.body;

  try {
    let existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    let existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (!username || !name || !password || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      username,
      email,
      passwordHash,
    });
    await newUser.save();

    return res.status(200).json({ message: "Registered successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

//!Logging in a user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //! Check if user exists with provided email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //! Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const userToken = {
      email: user.email,
      //username: user.username,
      id: user._id,
    };
    const signedToken = jwt.sign(userToken, process.env.SECRET);

    return res.status(200).json({
      email: user.email,
      //username: user.username,
      token: signedToken,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json("Server Error");
  }
});

//!LoggedOut

// Logout route
userRouter.post("/logout", (req, res) => {
  // Perform logout logic on the server side, e.g., clear session data
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Server Error" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
});

//!Getting a userinfo[NOT IMPLEMENTED]

userRouter.get("/userinfo", fetchUser, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userInfo = {
      username: req.user.username,
      email: req.user.email,
    };
    res.status(200).json(userInfo);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = userRouter;
