require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("./middlewares/cors.middleware");
const { env } = require("./configs/env.config");

require("./configs/db.config");

const app = express();

app.use(logger("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(cors);
app.use(express.json());

app.use("/api/v1", require("./configs/routes.config"));
app.use("/", require("./web"));

const port = env.PORT;
app.listen(port, () => console.info(`Application running in port ${port}`));
