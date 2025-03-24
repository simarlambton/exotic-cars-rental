// backend/utils/redisClient.js
const redis = require("redis");

const redisClient = redis.createClient({
  legacyMode: true,
  url: "redis://localhost:6379", // or your Redis server URL
});

redisClient.connect().catch(console.error);

redisClient.on("connect", () => console.log("🤡 Redis connected"));
redisClient.on("error", (err) => console.error("Redis error:", err));

module.exports = redisClient;
