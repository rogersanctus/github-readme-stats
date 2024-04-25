import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import express from "express";

const app = express();
const server_host = process.env.HOST || "127.0.0.1";
const server_port = process.env.PORT || 9000;

app.listen(server_port, server_host, () => {
  console.log(`Listening on ${server_host}:${server_port}`);
});

app.get("/", statsCard);
app.get("/pin", repoCard);
app.get("/top-langs", langCard);
app.get("/wakatime", wakatimeCard);
app.get("/gist", gistCard);
