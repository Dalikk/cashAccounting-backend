export default (req, res, next) => {
  const apiKey = process.env.API_KEY;
  const reqApiKey = req.headers["x-api-key"] || "";
  if (reqApiKey !== apiKey) {
    console.warn("Invalid API key");
    return res.status(403).json({"msg": "permission denied"});
  }
  next();
}
