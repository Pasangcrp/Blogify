const logger = require(`./logger`);
const User = require(`../models/user`);
const jwt = require(`jsonwebtoken`);

const requestLogger = (req, res, next) => {
  logger.info(`Method: `, req.method);
  logger.info(`Path: `, req.path);
  logger.info(`Body: `, req.body);
  logger.info(`---Request Log End---`);

  next();
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ message: `Could not reach the page` });
};

const fetchUser = async (req, res, next) => {
  try {
    const token = getTokenFrom(req);

    if (!token) {
      console.error("Token missing");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
      console.error("Invalid token");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      console.error("User not found");
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const getTokenFrom = (req) => {
  const auth = req.get("Authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return auth.substring(7);
  }
  return null;
};

const tokenExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return res.status(401).json({ message: "User Not Found" });
  }
  req.user = user;
  next();
};

/*
const tokenExtractor = async (req, res, next) => {
  try {
    const token = getTokenFrom(req);
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.id) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: "User Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
*/
module.exports = {
  requestLogger,
  unknownEndpoint,
  fetchUser,
  tokenExtractor,
};
