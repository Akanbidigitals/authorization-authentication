const checkbody = (req, res, next) => {
  if (!req.body.username || !req.body.username.trim()) {
    return res.status(401).json({
      message: "Username is required",
    });
  }

  if (!req.body.password || !req.body.username.trim()) {
    return res.status(401).json({
      message: "Password is required",
    });
  }
  next();
};

module.exports = { checkbody };
