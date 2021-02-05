const User = require("../models/user.model.js");
exports.login = (req,res) => {
    const user= new User({
        username: req.body.username,
        password: req.body.password
    });
    User.login(user,(err,data) =>{
        if(err)
            res.status(500).json({
                message:err.message||"Some error occurred."
            });
        else res.json(data);
    });
};
exports.findAll = (req, res) => {
    Customer.getAll((err,data)=>{
        if(err)
            res.status(500).json({
                message:err.message||"Some error occurred."
            });
        else res.json(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
    Customer.findById(req.params.customerId, (err,data)=>{
        if(err){
            if(err.kind==="not_found"){
                res.status(404).json({
                    message: `Not found Customer with id ${req.params.customerId}.`
                });
            }     
            else {
                res.status(500).json({
                    message: "Error retrieving Customer with id " + req.params.customerId
                });
            }
        } 

        else res.status(200).json(data);
  });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {
  if(!req.body){
      res.status(400).json({
          message:"Content can't be empty!"
      });
  }

  function result(err, data) {
    if(err){
      if(err.kind==="not_found"){
        res.status(404).json({
          message: `Not found Customer with id ${req.params.customerId}.`
        });
      } 
      else {
        res.status(500).json({
          message: "Error updating Customer with id " + req.params.customerId
        });
      }
  } 
  else res.json(data);
  }

  Customer.updateById(req.params.customerId,new Customer(req.body),result);
};

// Delete a Customer with the specified customerId in the request
exports.delete = (req, res) => {
    Customer.remove(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).json({
              message: `Not found Customer with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).json({
              message: "Could not delete Customer with id " + req.params.customerId
            });
          }
        } else res.json({ message: `Customer was deleted successfully!` });
      });
};


// Delete all Customers from the database.
exports.deleteAll = (req, res) => {
        Customer.removeAll((err, data) => {
          if (err)
            res.status(500).json({
              message:
                err.message || "Some error occurred while removing all customers."
            });
          else res.json({ message: `All Customers were deleted successfully!` });
        });
};
