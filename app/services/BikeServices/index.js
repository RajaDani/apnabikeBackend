const sequelize = require("../../../models/db");
const Bike = require("../../../models/bikes");
const Rent = require("../../../models/rent");
const City = require("../../../models/cities");
const { Op } = require("sequelize");
const BookedBike = require("../../../models/bookedBikes");
const createError = require("http-errors");

async function addBike({ value }, res) {
  try {
    let city = await City.findOne({
      where: {
        city_name: value.city,
      },
    });

    if (city) var cityId = city.id_city;

    let bike = await Bike.create({
      company: value.company,
      category: value.category,
      model: value.model,
      chasis_no: value.chasis_no,
      image: value.image,
      status: "0",
      id_city: cityId,
    });
    if (bike) return bike;
    else {
      var err = createError.BadRequest();
      res.send(err);
    }
  } catch (error) {
    console.log(error);
  }
}

async function addImgtoDB(newName, oldName, res) {
  console.log("old name", oldName);
  console.log("new name", newName);

  let image = await Bike.update(
    {
      image: newName,
    },
    {
      where: {
        image: oldName,
      },
    }
  );
  if (image) return;
  else res.status(401).send();
}

async function getBikes(itemoffset, res) {
  try {
    let newoffset = parseInt(itemoffset);

    let bike = await Bike.findAll({
      include: {
        model: Rent,
        required: true,
      },
      limit: 8,
      offset: newoffset,
    });

    let length = await Bike.count();
    if (bike || length) {
      return { bike, length };
    } else {
      res.status(400).send({ message: "Bikes not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function searchBikes(data) {
  try {
    let selectedCity = await City.findAll({
      where: {
        city_name: data.city,
      },
    });
    if (selectedCity) var cityId = selectedCity[0].id_city;

    let bookedBikes = await BookedBike.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: {
              booked_from: {
                [Op.between]: [data.bookedFrom, data.bookedTill],
              },
              booked_till: {
                [Op.between]: [data.bookedFrom, data.bookedTill],
              },
            },
          },
          {
            city: data.city,
          },
        ],
      },
    });

    if (bookedBikes) {
      let length = bookedBikes.length;
      console.log("Booked bikes are =>", bookedBikes);
      var booked = [];
      for (let i = 0; i < length; i++) {
        booked[i] = JSON.stringify(bookedBikes[i].bike_id);
      }
    }

    let Bikes = await Bike.findAll({
      include: {
        model: Rent,
      },
      where: {
        id_city: cityId,
        bike_id: { [Op.notIn]: booked },
      },
    });

    if (Bikes || bookedBikes) {
      console.log("Available bike =>", Bikes);
      return { Bikes, bookedBikes };
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.log(error);
  }
}

async function searchInCity(data, res) {
  try {
    let selectedCity = await City.findAll({
      where: {
        city_name: data.city,
      },
    });
    if (selectedCity) var cityId = selectedCity[0].id_city;

    let Bikes = await Bike.findAll({
      include: {
        model: Rent,
      },
      where: {
        id_city: cityId,
        status: "0",
      },
    });

    if (Bikes.length >= 1) {
      return Bikes;
    } else {
      res.status(400).send({ message: "Bikes not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateBikeData(data, res) {
  let update = await Bike.update(
    {
      company: data.company,
      model: data.model,
      category: data.category,
      chasis_no: data.chasis_no,
      image: data.image,
      status: data.status,
    },
    {
      where: {
        bike_uuid: data.bikeId,
      },
    }
  );

  if (update) return update;
  else res.status(400).send({ message: "Cannot be updated" });
}

async function deleteBikeData(data, res) {
  let deleteBike = await Bike.destroy({
    where: {
      bike_id: data,
    },
  });
  if (deleteBike) return deleteBike;
  else res.status(400).send({ message: "Cannot be updated" });
}

async function getTotalBikes(res) {
  let total = await Bike.count();
  if (total) return total;
  else res.status(401).send();
}

async function getClientBikes(res) {
  let bike = await Bike.findAll({
    include: {
      model: Rent,
    },
  });
  if (bike) return bike;
  else res.status(401).send();
}

async function searchInput(search, res) {
  let searchData = await Bike.findAll({
    where: {
      [Op.or]: {
        company: {
          [Op.like]: "%" + search + "%",
        },
        model: {
          [Op.like]: "%" + search + "%",
        },
        category: {
          [Op.like]: "%" + search + "%",
        },
      },
    },
  });

  if (searchData) {
    return searchData;
  } else res.status(401).send();
}

module.exports = {
  addBike,
  getBikes,
  searchBikes,
  searchInCity,
  updateBikeData,
  deleteBikeData,
  getTotalBikes,
  addImgtoDB,
  searchInput,
  getClientBikes,
};
