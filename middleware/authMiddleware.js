require('dotenv').config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.SECRET_TOKEN;

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  
  

  if (!token) {
    return res.status(401).json({ message: "Acesso negado, token não foi fornecido" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("Token decodificado: ", decoded); // Log adicional
    next();
  } catch (error) {
    console.error("Erro ao verificar token: ", error); // Log adicional
    res.status(403).json({ message: "Token inválido" });
  }
}

module.exports = authenticateToken;
