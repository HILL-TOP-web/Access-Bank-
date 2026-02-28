import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// ---------- PATH SETUP ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- APP SETUP ----------
const app = express();
const PORT = process.env.PORT || 3000;

// ---------- REQUIRED ENV VALIDATION ----------
const requiredEnv = [
  "MONGO_URI",
  "REDIS_URL",
  "SECRET_KEY",
  "PUBLIC_KEY",
  "BANK_API_URL" // ✅ Added your endpoint URL
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`❌ Missing environment variable: ${key}`);
    process.exit(1);
  }
}

// ---------- MIDDLEWARE ----------
app.use(express.json());

// ---------- FRONTEND FOLDER ----------
app.use(express.static(path.join(__dirname, "frontend")));

// ---------- SERVE INDEX.HTML ----------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/index.html"));
});

// ---------- WALLET FILE ----------
const WALLET_FILE = path.join(__dirname, "wallet.json");

// ---------- WALLET HELPERS ----------
async function readWallet() {
  const fs = await import("fs");

  if (!fs.existsSync(WALLET_FILE)) {
    fs.writeFileSync(
      WALLET_FILE,
      JSON.stringify(
        {
          balance: 0,
          wallet: { ngn: 0, usd: 0 },
          lockedAmount: 0,
          lastMined: Date.now()
        },
        null,
        2
      )
    );
  }

  return JSON.parse(fs.readFileSync(WALLET_FILE, "utf-8"));
}

async function writeWallet(wallet) {
  const fs = await import("fs");
  fs.writeFileSync(WALLET_FILE, JSON.stringify(wallet, null, 2));
}

// ---------- CONFIG ----------
const SKD_TO_NGN = Number(process.env.SKD_TO_NGN) || 3000000;
const SKD_TO_USD = 2000;
const MIN_WITHDRAW_SKD = Number(process.env.MIN_WITHDRAW_SKD) || 0;

// ---------- AUTO-MINING ----------
async function updateMining() {
  const wallet = await readWallet();
  const now = Date.now();
  const last = wallet.lastMined || now;
  const secondsPassed = Math.floor((now - last) / 1000);

  if (secondsPassed > 0) {
    wallet.balance += secondsPassed * 20;
    wallet.lastMined = now;
    await writeWallet(wallet);
  }

  return wallet;
}

// ---------- OPTIONAL: INTERNAL FUND CREDIT ----------
app.post("/internal/credit", async (req, res) => {
  const { amountNGN } = req.body;

  if (!amountNGN) {
    return res.status(400).json({ error: "Amount required" });
  }

  const wallet = await readWallet();
  wallet.wallet.ngn += amountNGN;
  await writeWallet(wallet);

  res.json({
    success: true,
    message: "Wallet credited internally",
    amount: amountNGN
  });
});

// ---------- SHARE WITH ROUTES ----------
app.locals = {
  readWallet,
  writeWallet,
  updateMining,
  SKD_TO_NGN,
  SKD_TO_USD,
  MIN_WITHDRAW_SKD,
  SECRET_KEY: process.env.SECRET_KEY,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  BANK_API_URL: process.env.BANK_API_URL // ✅ Expose your endpoint URL
};

// ---------- AUTO-WIRE ALL ROUTES ----------
const routesPath = path.join(__dirname, "routes");
const fsModule = await import("fs");

for (const file of fsModule.readdirSync(routesPath)) {
  if (file.endsWith(".js")) {
    const { default: route } = await import(`./routes/${file}`);
    const routeName = file.replace(".js", "").replace(/\./g, "-");
    app.use(`/${routeName}`, route);
    console.log(`✅ Route wired: /${routeName}`);
  }
}

// ---------- START SERVER ----------
app.listen(PORT, () => {
  console.log(`🚀 Ultra Banking App running on port ${PORT}`);
});
