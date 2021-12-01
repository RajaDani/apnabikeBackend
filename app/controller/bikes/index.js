const sequelize = require('../../../models/db');
const Bike = require('../../../models/bikes');
const Rent = require('../../../models/rent');
const City = require('../../../models/cities');
const BookedBike = require('../../../models/bookedBikes');
const { addBike, getBikes, searchBikes, addBookBike, searchInCity,
    updateBikeData, deleteBikeData, getTotalBikes } = require('../../services/BikeServices')
const { validateAddBike } = require('../../validators/Bike');
const { verifyToken } = require('../user');

async function addNewBike(req, res) {

    // let verifyUser = await verifyToken(req,res) ;
    console.log(req.body);
    let data = await validateAddBike(req.body, res);
    if (data) {
        console.log('Data from validator =>', data);
        let bikesData = await addBike(data, res);
        if (bikesData) res.send({ bikesData, message: 'Bike Added' });
    }
    else res.status(401).send({ message: 'Bike Not Added!' });

}

async function getAllBikes(req, res) {
    try {
        let allBikes = await getBikes(res);
        if (allBikes) res.send(allBikes);
    } catch (error) {
        console.log(error);
    }
}

async function getBike(req, res) {
    try {

        let bikeId = req.params.bikeId;
        let bikeDetail = await Bike.findAll({
            where: {
                bike_id: bikeId
            },
            include: {
                model: Rent,
                required: true
            }
        })
        if (bikeDetail) {
            console.log(bikeDetail);
            res.send(bikeDetail);
        }
    } catch (error) {

    }
}


const searchAvailableBikes = async (req, res) => {
    try {
        let availableBikes = await searchBikes(req.query);
        if (availableBikes) res.status(200).send(availableBikes);
        else res.status(404).send({ message: 'Bikes not found in this Date and City' })

    } catch (error) {
        console.log(error);
    }
}


const searchBikesInCity = async (req, res) => {
    try {
        let availableBikes = await searchInCity(req.query, res);
        if (availableBikes) res.status(200).send(availableBikes);
        else console.log('Bikes not found in this city !');

    } catch (error) {
        console.log(error);
    }
}

async function bookBike(req, res) {
    try {
        let bikeToAdd = await addBookBike(req.query);
        if (bikeToAdd) res.status(200).send(bikeToAdd);

        else {
            res.status(401).send();
        }

    } catch (error) {
        console.log(error);
    }
}

async function updateBike(req, res) {
    try {
        let validatedData = await validateAddBike(req.body, res);

        if (validatedData) {
            let updatedBike = await updateBikeData(req.body, res);
            if (updatedBike) res.status(200).send({ message: 'Updated' })
            else res.status(401).send({ message: 'Cannot be updated' })

        }

    } catch (error) {
        console.log(error);
    }
}

async function deleteBike(req, res) {
    try {
        let bikeId = req.params.bikeId;
        let deleteBike = await deleteBikeData(bikeId, res);
        if (deleteBike) res.status(200).send({ message: 'Deleted' })
        else res.status(401).send({ message: 'Cannot be deleted' })

    } catch (error) {
        console.log(error);
    }
}

async function totalBikes(req, res) {
    let total = await getTotalBikes(res);
    if (total) {
        console.log({ totalBikes: total });
        res.status(200).send({ totalBikes: total })
    }
    else res.status(401).send();
}

module.exports = {
    getAllBikes,
    addNewBike,
    searchAvailableBikes,
    getBike,
    bookBike,
    searchBikesInCity,
    updateBike,
    deleteBike,
    totalBikes
};