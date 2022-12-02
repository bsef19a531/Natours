const express = require("express");
const fs = require("fs");


const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

//Get tours Data from the server
app.get('/api/v1/tours/', (req, res) => {

    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours: tours
        }
    })
})

//Get tour Data from the server
app.get('/api/v1/tours/:id', (req, res) => {

    const id = req.params.id * 1;

    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        });
    }

    const tour = tours.find(tr => tr.id === id)
    res.status(200).json({

        status: "success",
        results: tours.length,
        data: {
            tour
        }
    })
})

// app.get('/', (req, res) => {

//     res.status(200).json({ "app": "test", "message": "URL fetched" });

// });

// Save a tour data on the server
app.post("/api/v1/tours/", (req, res) => {
    // console.log(req.body);
    const newTour = Object.assign({ id: tours[tours.length - 1].id + 1 }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    });

})

//Update existing tour on the server
app.patch("/api/v1/tours/:id", (req, res) => {

    const id = req.params.id * 1;
    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            tour: "<Updated tour...>"
        }
    })
})


//Delete existing tour on the server
app.delete("/api/v1/tours/:id", (req, res) => {

    const id = req.params.id * 1;
    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID"
        })
    }

    res.status(204).json({
        status: "success",
        data: null
    })
})


const port = 3000;


app.listen(port, () => { console.log(`App running on port ${port}...`) });