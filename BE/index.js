const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(cors());

const privateKey = `
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC40FI4TAGGuKBe
b+6Ndj61dZickKPHMDjd3hiiIe22gXpUiB9rXe15YVZ8lTUymlS3bfe5NHCYNDFm
sGOnY62mHypIUe0b1L5wO7YlFuT08UQDMcf3OsyM0rG1lPiEQ5Q9ZCBGbjM1G0o5
p95U/fdccJyrqwwR3ezeIxqGUQ8AxeM8AhOoYMCG0cecFHAhwdLZrGJ0Q5ozy31n
Nryjkg0mS7NunwzUmkXuouQkzE6it38sbaGLFTA5jPYjfZoMsBO/XZwDY9QYsnEa
/nCvfGPx8dFt/DaVXCMh5OCJiaeCHPvB0sZmWlS21PBnFmVgI55bQCfSR5b8gW0I
bxrNc/HHAgMBAAECggEAe5JvJ01Kx/Wy5PIao2Oo0lPq0uSzXYAUxeS2u9HLy/gO
/25086k+G6bF2U863rbqZiuVM7SohFyBm5PdThMMDMNR1kFRNQauvwRt6abBODYJ
r8kdV2VtV8uZHzyYXneBKvtDyVPt0ViJ7Lsdod6eAqUZXH9l9pxYwL7gAWc5jN2h
BaHBVMdXVJc4izUNx6XB8ANVQUMzfoDDGrZCjvt+O86RUQxKuOj7zN5bpVUThZ6O
sLWLElHmcAEEN1x8WowoIGXe+ZxJRuNrKejfY0+aQ96Tlwb24xDOm4FA5emLEm7O
Vf3+lLXkRpbJtaUzAuhQcQAP6k+COEaljzENBVYRAQKBgQDcyvrzE0p2p5vCOVUI
rhtqWGwA+scifOmozdU5CuAREByLBlcRUflrDisJRslyz2E+phMvELFrDXF1LiPf
iYoKFWZ6U+qg4TNx0gRFAYl0IMMEMK45qUkuRID/7RrIup1/Aa9fESmNaaF3mMaf
VEPI7UfGpoGUpCzNFZPVHdt8IQKBgQDWSKGTGIGwUa1zLecN7HGQLIisyYUiA0WO
nTSRwBsKpjLR8mDq9V5YNrVDjyOLxfVFjaSSojofmLoCgpug/+61lNoimY7qbeS7
HKW1vQ0BsmzZB/aUSlH+lY6FsJXvsrZr96jVW8EYdPq7WzqfFzw8Yfq2B+gNwALB
PN9EVwjw5wKBgG/DN6BPhYPmd8uq5cZNC4ebVqBwUNi+TjCqcGI9hQpeE3S0MuKL
kiuEsngxostA+kKSImfSlVxRI7tjLbl7j6pnBsapL71cAYR+ALdFfeSQqOa4FZkO
fgKznnDt/n7ZJ9wgaDtBHr18WMWHShNgvic5JPoDUtiA+kSdxYU9ZdrBAoGBAMft
OCMf6FBzxFsEZuFMy5/yjQp5cueLGei3sAaUsCY9bokHlXliuUWgtXp1IHsWlYLx
Zq0RAx3bxyD0bvPGFhgA640ArKD5K0GQtuNbobkFmhzcGym8NchMDY+adCoSGbWe
ej2mwABrlEweEBHDAgZsfBg+RDof/fIBM2Z1tffdAoGBAKQ90wRFT5CkMEooDEoe
w6DPEj/Whwiwk8R6xfv+3gW+TTjAmhj1BhXziSAoIAXfoFbX74iZ5+2qK/fHyHNJ
6yljYQLOYODZ7/DONHFAirPUxpWfxSP9381LsubNkAaDK/kNcP+/l9mp5uTawEaY
T0C5ldiDDlLsVIQrqmpX7Uf4
-----END PRIVATE KEY-----`;

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/jwt", function (req, res) {
  console.log("-----", req);

  // NOTE: Before you proceed with the TOKEN, verify your users' session or access.
  const sub = "99";
  const name = "Thanh";
  const payload = {
    sub, // Unique user id string
    name, // Full name of user

    // Optional custom user root path
    "https://claims.tiny.cloud/drive/root": `/${name}`,

    exp: Math.floor(Date.now() / 1000) + 60 * 10 // 10 minutes expiration
  };

  try {
    const token = jwt.sign(payload, privateKey, { algorithm: "RS256" });
    res.set("content-type", "application/json");

    res.status(200);
    res.send(
      JSON.stringify({
        token: token
      })
    );
  } catch (e) {
    res.status(500);
    res.send(e.message);
  }
});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
