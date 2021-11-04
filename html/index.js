const { application } = require("express");
const express = require("express");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("api/signup", (req, res) => {
  let { name } = req.body;

  let api = `https://avatars.dicebear.com/api/:identicon/${name}.svg`;
  return res.json({ avatar });
});

// module.exports = router;
