const Rent = require('../../../models/rent');

async function addNewRent(data, res) {
    let rent = await Rent.create({
        daily_rent: data.daily_rent,
        weekly_rent: data.weekly_rent,
        monthly_rent: data.monthly_rent,
        bike_id: data.bikeId
    })

    if (rent) return rent;
    else res.status(401).send({ message: 'Cannot add rent' });
}

module.exports = {
    addNewRent
}