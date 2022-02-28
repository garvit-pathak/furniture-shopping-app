const pool = require("../util/database");
module.exports = class Product{
  constructor(productName,productPrice,productQty,description,frontview,backview,leftview,rightview){
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQty = productQty;
    this.description = description;
    this.frontViewImage = frontview;
    this.backViewImage = backview;
    this.leftViewImage = leftview;
    this.rightViewImage = rightview;     
  }
  static fetchAllProduct(){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
        if(!err){
          let sql = "select * from product";
          con.query(sql,(err,queryResults)=>{
            con.release();
            err ? reject(err) : resolve(queryResults);
          });
        }
        else
          reject("err..");
      })
    });
  }
  delete(productid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
        if(!err){
          let sql="delete from product where productid=?";
          con.query(sql,[this.productid=productid],(err,queryResult)=>{
            con.release();   
            err ? reject(err) : resolve(queryResult); 
          });
        }
        else
        reject(err);
      })
    });
  }
  save(){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
            if(!err){
               let sql = "insert into product(productName,productPrice,productQty,description,frontview,backview,leftview,rightview) values(?,?,?,?,?,?,?,?)";
                con.query(sql,[
                    this.productName,
                    this.productPrice*1,
                    this.productQty*1,
                    this.description,
                    this.frontview,
                    this.backview,
                    this.leftview,
                    this.rightview
                ],(err,queryResult)=>{
                 con.release();   
                 err ? reject(err) : resolve(queryResult); 
                });
            }
            else
             reject(err);
        })                
      });
  }
}