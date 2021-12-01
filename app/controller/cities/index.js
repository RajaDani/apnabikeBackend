var sequelize = require('../../../models/db');
var Cities = require('../../../models/cities');
// var City = require('../../../models/citiesAndBikes');

async function addCity(req, res) {
    let city = await Cities.create({ city_name: 'Faislabad' });
}

async function getCities(req, res) {
    let cities = await Cities.findAll();
    if (cities) res.status(200).send(cities);
    else res.status(400).send({ message: 'cities not found' })
}

module.exports = { addCity, getCities }
