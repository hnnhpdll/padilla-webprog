const express = require("express");
const router = express.Router();

// test route
router.get("/", (req, res) => {
    res.json({ message: "Articles route working" });
});

module.exports = router;