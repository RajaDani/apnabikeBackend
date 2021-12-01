const sequelize = require('../../../models/db');
const Bike = require('../../../models/bikes')
const Rent = require('../../../models/rent');
const City = require('../../../models/cities');
const { Op, where } = require('sequelize');
const BookedBike = require('../../../models/bookedBikes');

const createError = require('http-errors');
const { func } = require('joi');

async function addBike({ value }, res) {
    try {
        console.log('data in services =>', value);

        let city = await City.findOne({
            where: {
                city_name: value.city
            }
        })

        if (city) var cityId = city.id_city;

        let bike = await Bike.create({
            company: value.company,
            category: value.category,
            model: value.model,
            chasis_no: value.chasis_no,
            image: value.image,
            status: '0',
            id_city: cityId
        });
        if (bike) return bike;
        else {
            var err = createError.BadRequest();
            res.send(err);
        }
    } catch (error) {
        console.log('Error in services');
    }
}


async function getBikes() {
    try {
        let bike = await Bike.findAll({
            include: {
                model: Rent,
                required: true
            },
        });
        if (bike) return bike;
        else {
            res.status(400).send({ message: 'Bikes not found' })
        }
    } catch (error) {
        console.log(error);
    }
}


async function searchBikes(data) {
    try {

        let selectedCity = await City.findAll({
            where: {
                city_name: data.city
            }
        }); if (selectedCity) var cityId = selectedCity[0].id_city;

        let bookedBikes = await BookedBike.findAll({
            where: {
                [Op.or]: {
                    booked_from: {
                        [Op.between]: [data.bookedFrom, data.bookedTill]
                    },
                    booked_till: {
                        [Op.between]: [data.bookedFrom, data.bookedTill]
                    },
                },
            },
        });

        let Bikes = await Bike.findAll({
            include: {
                model: Rent
            },
            where: {
                id_city: cityId
            }
        });

        if (Bikes.length > 1) {
            return { Bikes, bookedBikes };
        }
        else {
            var err = createError.BadRequest();
            res.send(err);
        }

    } catch (error) {
        console.log(error);
    }
}


async function searchInCity(data, res) {
    try {

        let selectedCity = await City.findAll({
            where: {
                city_name: data.city
            }
        }); if (selectedCity) var cityId = selectedCity[0].id_city;

        let Bikes = await Bike.findAll({
            include: {
                model: Rent
            },
            where: {
                id_city: cityId
            }
        });

        if (Bikes.length > 1) {
            return Bikes;
        }
        else {
            res.status(400).send({ message: 'Bikes not found' })
        }

    } catch (error) {
        console.log(error);
    }
}


async function addBookBike(data, res) {
    try {
        console.log(data.bike);
        let newBookedBike = await BookedBike.create({
            bike_id: data.bikeid,
            user_id: data.userId,
            booked_from: data.pickup,
            booked_till: data.dropoff,
            city: data.city
        })
        if (newBookedBike) {
            console.log(newBookedBike.booked_bikes_id);
            return newBookedBike;
        }
        else res.status(401).send();
    } catch (error) {
        console.log(error);
    }
}

async function updateBikeData(data, res) {

    console.log('In service Data is ==>', data);
    let update = await Bike.update({
        company: data.company,
        model: data.model,
        category: data.category,
        chasis_no: data.chasis_no,
        image: data.image,
        status: data.status,
    }, {
        where: {
            bike_id: data.bikeId
        }
    })

    if (update) return update;
    else res.status(400).send({ message: 'Cannot be updated' })

}


async function deleteBikeData(data, res) {

    let deleteBike = await Bike.destroy({
        where: {
            bike_id: data
        }
    })
    if (deleteBike) return deleteBike;
    else res.status(400).send({ message: 'Cannot be updated' })

}

async function getTotalBikes(res) {
    let total = await Bike.count();
    if (total) { console.log(total); return total; }
    else res.status(401).send();
}

module.exports = {
    addBike,
    getBikes,
    searchBikes,
    addBookBike,
    searchInCity,
    updateBikeData,
    deleteBikeData,
    getTotalBikes
}