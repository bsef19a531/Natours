const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Tour = require("./models/tourModels");
const fs = require('fs');
const { dirname } = require("path");

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

const tours = JSON.parse(fs.readFileSync(`${__dirname}\\data\\tours-simple.json`, 'utf-8'));

//Import all data from file
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log("Data Imported Successfully");
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
}

//Delete all data from DB
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log("Data Deleted Successfully");
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
}

// console.log(process.argv);

if ((process.argv[2]) === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}

