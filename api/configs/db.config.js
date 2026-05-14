const mongoose = require("mongoose");
const { env } = require("./env.config");

mongoose
  .connect(env.MONGODB_URI)
  .then(() => console.info(`Successfully connected to the database ${env.MONGODB_URI}`))
  .catch((error) => {
    console.error(`An error occurred trying to connect to the database: ${env.MONGODB_URI}`, error);
    process.exit(1);
  });
