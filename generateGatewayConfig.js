const crypto = require("crypto");

// Generate random public key (32 bytes)
const publicKey = "pk_live_" + crypto.randomBytes(32).toString("hex");

// Generate random secret key (64 bytes)
const secretKey = "sk_live_" + crypto.randomBytes(64).toString("hex");

// Generate random endpoint path
const endpointPath = "/api/" + crypto.randomBytes(8).toString("hex");

// Base URL (change this when deploying)
const baseURL = "http://localhost:5000";

// Final endpoint URL
const endpointURL = baseURL + endpointPath;

console.log("\n===== MINE GATEWAY CONFIG =====\n");
console.log("PUBLIC_KEY=" + publicKey);
console.log("SECRET_KEY=" + secretKey);
console.log("ENDPOINT_URL=" + endpointURL);
console.log("\n================================\n");
