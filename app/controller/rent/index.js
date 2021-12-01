const sequelize = require('../../../models/db');
const Rent = require('../../../models/rent');
const BookedBikes = require('../../../models/bookedBikes');
const { addNewRent } = require('../../services/RentServices');

const addRent = async (req, res) => {

    try {
        console.log(req.query);
        let rent = await addNewRent(req.query);
        if (rent) res.status(200).send({ rent, message: 'Rent Added' })

        else res.status(401).send({ message: 'Rent Not Added' })
    } catch (error) {
        console.log(error);
    }
}


const getRent = async (req, res) => {
    try {
        let rent = await Rent.findAll();
        if (rent) res.send(rent);
    } catch (error) {

    }
}

module.exports = { addRent, getRent }