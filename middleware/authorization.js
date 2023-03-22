const { reset } = require("nodemon");

exports.authorization = (...role) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;

      if (!role.includes(userRole)) {
        return res.status(403).json({
          status: "failed",
          error: "You are not authorized",
        });
      }

      next();
    } catch (error) {
      res.status(403).json({
        status: "failed",
        error: error.message,
      });
    }
  };
};
