require("dotenv").config({
      path:"../.env"
})

const app = require("./app");
const connectDB = require("./config/db");
const seedAdmin = require("./seed");
seedAdmin();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});