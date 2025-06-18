const multer = require("multer");

const storage = multer.memoryStorage(); // ✅ add parentheses here!
const upload = multer({ storage });

module.exports = upload;
