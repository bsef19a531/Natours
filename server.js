const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");



//DB Connection
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("DB Connected Successfully");
});
// console.log(process.env);



const port = process.env.PORT;


app.listen(port, () => { console.log(`App running on port ${port}...`) });