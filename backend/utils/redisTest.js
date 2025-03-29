const { exec } = require("child_process");
const redis = require("redis");

const redisClient = redis.createClient({
  legacyMode: true,
  url: "redis://localhost:6379", // or your Redis server URL
});

const startRedisIfNotRunning = () => {
  // Check if Redis is running
  exec("pgrep redis-server", (err, stdout, stderr) => {
    if (err || stderr) {
      console.log("Redis is not running. Starting Redis...");

      // Start Redis via Homebrew
      exec(
        "brew services start redis",
        (startErr, startStdout, startStderr) => {
          if (startErr) {
            console.error("Failed to start Redis:", startErr);
            return;
          }

          console.log("Redis started successfully:", startStdout);
          connectToRedis();
        }
      );
    } else {
      console.log("Redis is already running.");
      connectToRedis();
    }
  });
};

const connectToRedis = () => {
  // Connect to Redis
  redisClient.connect().catch(console.error);

  redisClient.on("connect", () => console.log("🤡 Redis connected"));
  redisClient.on("error", (err) => console.error("Redis error:", err));

  // Now you can proceed with other app logic
  console.log("Your app is ready to use Redis!");
};

// Start Redis when the app is launched
startRedisIfNotRunning();

module.exports = redisClient;
// Your app logic starts here
// For example, Express setup, etc.
