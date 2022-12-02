const express = require("express");
const fs = require("fs");


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`));

//CallBack for Tours
const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: tours
        }
    })
};

const getTour = (req, res) => {

    const id = req.params.id * 1;

    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            requestedAt: req.requestTime,
            message: "Invalid ID"
        });
    }

    const tour = tours.find(tr => tr.id === id)
    res.status(200).json({

        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tour
        }
    })
}

const saveTour = (req, res) => {
    // console.log(req.body);
    const newTour = Object.assign({ id: tours[tours.length - 1].id + 1 }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            requestedAt: req.requestTime,
            data: {
                tour: newTour
            }
        })
    })
}


const updateTour = (req, res) => {

    const id = req.params.id * 1;
    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            requestedAt: req.requestTime,
            message: "Invalid ID"
        })
    }

    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        data: {
            tour: "<Updated tour...>"
        }
    })
}


const deleteTour = (req, res) => {

    const id = req.params.id * 1;
    if (id >= tours.length) {
        return res.status(404).json({
            status: "fail",
            requestedAt: req.requestTime,
            message: "Invalid ID"
        })
    }

    res.status(204).json({
        status: "success",
        requestedAt: req.requestTime,
        data: null
    })
}

///////////////////////////////////////////////////

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}

const createUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: "error",
        message: "This Route is still not defined on the server"
    })
}


const tourRouter = express.Router();
const userRouter = express.Router()


app.use("/api/v1/tours/", tourRouter);
app.use("/api/v1/users/", userRouter);
//Get All tour and Post a Tour
tourRouter.route("/").get(getAllTours).post(saveTour);

//Get tour, update it and delete a Tour
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);


//Get All user and create a user
userRouter.route("/").get(getAllUsers).post(createUser);

//Get user, update it and delete a user
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

const port = 3000;


app.listen(port, () => { console.log(`App running on port ${port}...`) });