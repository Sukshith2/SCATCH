const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("show me products");
})


module.exports = router;