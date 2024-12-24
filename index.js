const express = require ("express");
const app = express();
const PORT =8002;
app.listen(PORT  , ()=>console.log(`Server Started at PORT:${PORT}`))