const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

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

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tour must have a Name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        required: [true, "Tour Must have Price"]
    }
});

const Tour = mongoose.model('Tour', tourSchema);

const port = process.env.PORT;


app.listen(port, () => { console.log(`App running on port ${port}...`) });