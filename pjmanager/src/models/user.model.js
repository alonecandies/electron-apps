const sql = require("./db.js");
const User = function(user) { 
    this.username= user.username;
    this.password= user.password;
};
User.login = (result) => {
    sql.query(`select * from user where username = ${username} and password =${password}`,(err,res) => {
        if(err) { 
            console.log("error:",err);
            result(err,null);
            return;
        }
        console.log("Login Success: ",{username:user.username});
        result(null, {username: username});
    });
}
// };
// Customer.findById = (customerId, result) => {
//     sql.query(`select * from customers where id= ${customerId}`,(err, res)=>{
//         if(err){
//             console.log("error: ",err);
//             result(err,null);
//             return;
//         }
//         if (res.length)
//         {
//             console.log("found customer: ",res[0]);
//             result(null,res[0]);
//             return;
//         }
//         result({kind: "not_found"},null);
//     });
// };
// Customer.getAll = result => {
//     sql.query("select * from customers",(err,res)=>{
//         if(err) {
//             console.log("error: ",err);
//             result(null,err);
//             return;
//         }
//         console.log("customers: ",res);
//         result(null,res);
//     });
// };
// Customer.updateById = (id,customer,result) => {
//     sql.query("update customers set email = ?, name=?, active=? where id=?",[customer.email,customer.name,customer.active,id],(err,res)=>{
//         if(err){
//             console.log("error: ",err);
//             result(err,null);
//             return;
//         }
//         if(res.affectedRows==0){
//             result({kind:"not_found"},null);
//             return;
//         }
//         console.log("updated customer: ",{id:id,...customer});
//         result(null,{id:id,...customer});
//     });
// };
// Customer.remove = (id, result) => {
//     sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       if (res.affectedRows == 0) {
//         // not found Customer with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }
  
//       console.log("deleted customer with id: ", id);
//       result(null, res);
//     });
//   };
  
//   Customer.removeAll = result => {
//     sql.query("DELETE FROM customers", (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
  
//       console.log(`deleted ${res.affectedRows} customers`);
//       result(null, res);
//     });
//   };
  
  module.exports = User;