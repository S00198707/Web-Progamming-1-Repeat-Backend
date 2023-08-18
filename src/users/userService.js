var userModel = require('./userModel');
var key = '987654321osdosdd';
var encryptor = require('simple-encryptor')(key);


module.exports.createUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
     var userModelData = new userModel();
     userModelData.firstname = userDetails.firstname;
     userModelData.lastname = userDetails.lastname;
     userModelData.email = userDetails.email;
     userModelData.password = userDetails.password;
     userModelData.isAdmin = userDetails.isAdmin;
     var encrypted = encryptor.encrypt(userDetails.password);
     userModelData.password = encrypted;
 
     userModelData.save(function resultHandle(error, result) {
       if (error) {
         reject(false);
       } else {
         resolve(true);
       }
     });
   });
 };
module.exports.loginUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
     userModel.findOne({ email: userDetails.email }, function getresult(errorvalue, result) {
       if (errorvalue) {
         reject({ status: false, msg: "Invalid Data" });
       } else {
         if (result != undefined && result != null) {
           var decrypted = encryptor.decrypt(result.password);
 
           if (decrypted == userDetails.password) {
             resolve({ status: true, msg: "New User Has Been Validated Successfully", user: result });
           } else {
             reject({ status: false, msg: "Incorrect Email or Password" });
           }
         } else {
           reject({ status: false, msg: "Incorrect User Details" });
         }
       }
     });
   });
};

module.exports.deleteUserDBService = (userId) => {
   return new Promise(function myFn(resolve, reject) {
     userModel.findByIdAndDelete(userId, function deleteResult(error, result) {
       if (error) {
         reject(false);
       } else {
         resolve(true);
       }
     });
   });
 };