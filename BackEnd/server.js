// require('dotenv').config()
require('dotenv').config();
console.log("API Key Loaded:", process.env.GOOGLE_GEMINI_KEY ? "Yes" : "No");
const app = require("./src/app");





app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
})