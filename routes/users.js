var express = require('express');
var router = express.Router();
var add = require('../app/controller/user');

/* GET users listing. */
router.post('/', add.addNewUser);
router.post('/addadmin', add.addAdmin);
router.post('/verifyadmin', add.verifyAdmin);
router.post('/getuser', add.authenticateUser);
router.get('/verifytoken', add.verifyToken);
router.get('/getallusers', add.getAllUsers);
router.get('/verifyuser/:mobile', add.verifyUser);
router.put('/updateuser', add.updateUser);
router.delete('/deleteuser/:userId', add.deleteUser);


module.exports = router;
