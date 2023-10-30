const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

function isSecurePassword(password) {
  if (password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres";
  }

  if (!/[A-Z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra maiuscula";
  }
}

app.post("/validate-password", (req, res) => {
  const password = req.body.password;
  const error = isSecurePassword(password);

  if (error) {
    res.status(400).json({ error });
  } else {
    res.status(200).send();
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port " + port);
});
