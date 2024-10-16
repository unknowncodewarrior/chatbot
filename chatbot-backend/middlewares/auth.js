// A simple middleware example to check for authentication (if needed).
module.exports = (req, res, next) => {
    // Add your auth logic here, if required
    next();
  };
  