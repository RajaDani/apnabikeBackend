const sequelize = require("../../../models/db");
const Bike = require("../../../models/bikes");
const Rent = require("../../../models/rent");
const {
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
} = require("../../services/BikeServices");
var fs = require("fs");
const { validateAddBike } = require("../../validators/Bike");

async function addNewBike(req, res) {
  console.log(req.body);
  let data = await validateAddBike(req.body, res);
  if (data) {
    console.log("Data from validator =>", data);
    let bikesData = await addBike(data, res);
    if (bikesData) res.send({ bikesData, message: "Bike Added" });
  } else res.status(401).send({ message: "Bike Not Added!" });
}

async function addBikeImg(req, res) {
  try {
    let imgType = req.file.mimetype.split("/");
    let oldpath = req.file.path;
    let filename = req.file.filename + "." + imgType[1];

    let originalName = req.file.originalname;

    let newPath =
      __dirname +
      "/../../../public/images/" +
      req.file.filename +
      "." +
      imgType[1];

    fs.rename(oldpath, newPath, function (err) {
      if (err) throw err;
      else {
        let image = addImgtoDB(filename, originalName, res);
        if (image) res.status(200).send();
        else throw err;
      }
    });
  } catch (err) {
    res.status(400).send();
  }
}

async function getAllBikes(req, res) {
  try {
    let allBikes = await getBikes(req.query.offset, res);
    if (allBikes) res.status(200).send(allBikes);
    else res.status(401).send();
  } catch (error) {
    console.log(error);
  }
}

async function getAllBikesClient(req, res) {
  try {
    let allBikes = await getClientBikes(res);
    if (allBikes) res.status(200).send(allBikes);
    else res.status(401).send();
  } catch (error) {
    console.log(error);
  }
}

async function getBike(req, res) {
  try {
    let bikeId = req.params.bikeId;
    console.log("i am here!");
    let bikeDetail = await Bike.findOne({
      where: {
        bike_id: bikeId,
      },
      include: {
        model: Rent,
        required: true,
      },
    });
    if (bikeDetail) {
      res.status(200).send(bikeDetail);
    } else res.status(404).send();
  } catch (error) {
    console.log(error);
  }
}

const searchAvailableBikes = async (req, res) => {
  try {
    let availableBikes = await searchBikes(req.query);
    if (availableBikes) res.status(200).send(availableBikes);
    else
      res
        .status(404)
        .send({ message: "Bikes not found in this Date and City" });
  } catch (error) {
    console.log(error);
  }
};

const searchBikesInCity = async (req, res) => {
  try {
    let availableBikes = await searchInCity(req.query, res);
    if (availableBikes) res.status(200).send(availableBikes);
    else console.log("Bikes not found in this city !");
  } catch (error) {
    console.log(error);
  }
};

async function updateBike(req, res) {
  try {
    let validatedData = await validateAddBike(req.body, res);

    if (validatedData) {
      let updatedBike = await updateBikeData(req.body, res);
      if (updatedBike) res.status(200).send({ message: "Updated" });
      else res.status(401).send({ message: "Cannot be updated" });
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteBike(req, res) {
  try {
    let bikeId = req.params.bikeId;
    let deleteBike = await deleteBikeData(bikeId, res);
    if (deleteBike) res.status(200).send({ message: "Deleted" });
    else res.status(401).send({ message: "Cannot be deleted" });
  } catch (error) {
    console.log(error);
  }
}

async function totalBikes(req, res) {
  let total = await getTotalBikes(res);
  if (total) {
    res.status(200).send({ totalBikes: total });
  } else res.status(401).send();
}

async function searchByInput(req, res) {
  let search = req.query.search;
  let searchData = await searchInput(search, res);
  if (searchData) {
    res.status(200).send(searchData);
  } else res.status(404).send();
}

module.exports = {
  getAllBikes,
  addNewBike,
  searchAvailableBikes,
  getBike,
  searchBikesInCity,
  updateBike,
  deleteBike,
  totalBikes,
  addBikeImg,
  searchByInput,
  getAllBikesClient,
};
