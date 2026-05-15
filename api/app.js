require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("./middlewares/cors.middleware");
const { env } = require("./configs/env.config");

require("./configs/db.config");

const app = express();

app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", "https:", "data:"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        imgSrc: [
          "'self'",
          "data:",
          "https://image.tmdb.org",
          "https://art-gallery-emea.api.hbo.com",
          "https://maps.googleapis.com",
          "https://maps.gstatic.com",
          "https://*.googleapis.com",
          "https://*.gstatic.com",
        ],
        objectSrc: ["'none'"],
        scriptSrc: ["'self'", "https://maps.googleapis.com", "https://*.googleapis.com"],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", "https:", "'unsafe-inline'"],
        connectSrc: ["'self'", "https://maps.googleapis.com", "https://*.googleapis.com"],
        upgradeInsecureRequests: [],
      },
    },
  })
);
app.use(cookieParser());
app.use(cors);
app.use(express.json());

app.use("/api/v1", require("./configs/routes.config"));
app.use("/", require("./web"));

const port = env.PORT;
app.listen(port, () => console.info(`Application running in port ${port}`));
