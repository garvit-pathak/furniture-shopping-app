const pool = require("../util/database");
module.exports = class Product{
  constructor(productName,productPrice,productQty,description,frontview,backview,leftview,rightview){
    this.productName = productName;
    this.productPrice = productPrice;
    this.productQty = productQty;
    this.description = description;
    this.frontview = frontview;
    this.backview = backview;
    this.leftview = leftview;
    this.rightview = rightview;     
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
  static fetchAll(){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
        if(!err){
          let sql = "select * from product";
          con.query(sql,(err,results)=>{
            err ? reject(err) : resolve(results);
            con.release();
          });            
        }
        else
          reject(err);
      });        
    });
 }
  static delete(productid){
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,con)=>{
        if(!err){
            let sql = "delete from product where productid = ? ";
            con.query(sql,[parseInt(productid)],(err,result)=>{
              err ? reject(err) : resolve(result);
              con.release();
            });
        }
        else
          reject(err);
      });
     });
    }
    static fetchProductById(productid){
      return new Promise((resolve,reject)=>{
        pool.getConnection((err,con)=>{
          if(!err){
             let sql = "select * from product where productid = ? ";
             con.query(sql,[productid],(err,result)=>{
               err ? reject(err) : resolve(result);
               con.release();
             });
          }
          else
            reject(err);
        });
      });
      }
      update(){
        return new Promise((resolve,reject)=>{
         pool.getConnection((err,con)=>{
           if(!err){
             let sql = "update product set productName=?,productPrice=?,productQty=?,description=?,frontview=? where productid= ?";
             con.query(sql,[this.productName,this.productPrice*1,this.productQty,this.description,this.frontview,this.productid],(err,result)=>{
               err ? reject(err) : resolve(result);
               con.release();
             });
           }
           else
             reject(err);
         }); 
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
