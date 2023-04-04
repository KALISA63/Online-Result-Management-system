const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.token;
    if (!authHeader) {
      return res
        .status(401)
        .json({ status: "error", error: "You are not authenticated" });
    }
    const token = authHeader.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ status: "error", error: "You are not authorized" });
    const verified = jwt.verify(token,process.env.SCRETKEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ status: "error", error: error.message });
  }
};

const verifyAdmin = (req,res,next) =>{
    verifyToken(req,res,() =>{
        if(req.user.role === 'admin'){
            next();
        }
        else{
            return res.status(401).json({status:"error",error:"You are not allowed"});
        }
    })
}

module.exports = { verifyToken,verifyAdmin };
