var userService = require('./userService');
var userModel = require('./userModel');



var createUserControllerFn = async (req, res) => {
  try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);

    if (status) {
      res.send({ "status": true, "message": "User created successfully" });
    } else {
      res.send({ "status": false, "message": "Error creating user" });
    }
  } catch (err) {
    console.log(err);
  }
};


var loginUserControllerFn = async (req, res) => {
    try {
      var result = await userService.loginUserDBService(req.body);
      if (result.status) {
        if (result.user.isAdmin) {
          res.send({ "status": true, "message": result.msg, "isAdmin": true });
        } else {
          res.send({ "status": true, "message": result.msg, "isAdmin": false });
        }
      } else {
        res.send({ "status": false, "message": result.msg });
      }
    } catch (error) {
      console.log(error);
      res.send({ "status": false, "message": error.msg });
    }
  };
  
var deleteUserControllerFn = async (req, res) => {
    try {
      var userId = req.params.userId;
      registeredUsers = registeredUsers.filter(user => user.id !== userId);
  
      res.send({ status: true, message: 'User deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: false, message: 'Internal Server Error' });
    }
  };
  
var getUsersControllerFn = async (req, res) => {
  try {
    var users = await userModel.find().exec();
    res.json({ users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
userService.createUserDBService({
  firstname: 'Geoffery',
  lastname: 'Yakub',
  email: 'georgeyakub11@admin.com',
  password: 'admin123',
  isAdmin: true
})
  .then(status => {
    console.log('Admin user created successfully');
  })
  .catch(error => {
    console.log('Error creating admin user:', error);
  });

module.exports = {
  createUserControllerFn,
  loginUserControllerFn,
  getUsersControllerFn,
  deleteUserControllerFn
};

