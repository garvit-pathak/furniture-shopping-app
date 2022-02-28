const pool = require('../util/database');
module.exports = class Category {
    constructor(categoryName, categoryImage) {
        this.categoryName = categoryName;
        this.categoryImage = categoryImage;
    }
    static fetchAllCategory() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from category";
                    con.query(sql, (err, queryResults) => {
                        con.release();
                        err ? reject(err) : resolve(queryResults);
                    });
                }
                else
                    reject(err);
            });
        });
    }
    static fetchAll() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "select * from category";
                    con.query(sql, (err, results) => {
                        err ? reject(err) : resolve(results);
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
             let sql = "update category set categoryName=?,frontview=?,backview=?,leftview=?,rightview=? where categoryId= ?";
             con.query(sql,[this.productName,this.frontview,this.backview,this.leftview,this.rightview,this.categoryId],(err,result)=>{
               err ? reject(err) : resolve(result);
               con.release();
             });
           }
           else
             reject(err);
         }); 
         });
        }
    static fetchCategoryById(categoryId){
        return new Promise((resolve,reject)=>{
          pool.getConnection((err,con)=>{
            if(!err){
               let sql = "select * from product where categoryId = ?";
               con.query(sql,[categoryId],(err,result)=>{
                 err ? reject(err) : resolve(result);
                 con.release();
               });
            }
            else
              reject(err);
          });
        });
        }
    save() {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, con) => {
                if (!err) {
                    let sql = "insert into category(categoryName,categoryImage) values(?,?)";
                    con.query(sql, [this.categoryName, this.categoryImage], (err, queryResult) => {
                        con.release();
                        err ? reject(err) : resolve(queryResult);
                    });
                }
                else
                    reject(err);
            });
        });
    }

}