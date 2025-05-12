const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.user) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized Access - Please log in" });
    }
  };
  
  module.exports = isAuthenticated;
  