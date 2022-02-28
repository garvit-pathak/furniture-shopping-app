const Category = require('../model/category.model');
const path = require("path");
const Product = require("../model/product.model");
exports.saveProduct  = (request,response,next)=>{
    let product = new Product();
    product.frontview = "";
    product.backview = "";
    product.leftview = "";
    product.rightview = "";
    if(request.files.length>0){
       product.frontview = request.files[0].filename;
       if(request.files.length>1){
           product.backview = request.files[1].filename;
           if(request.files.length>2){
               product.leftview = request.files[2].filename;
               if(request.files.length>3){
                   product.rightview = request.files[3].filename;
               }
           }
       }
    }
    product.categoryId  = request.body.categoryId;
    product.productName = request.body.productName;
    product.productQty = request.body.productQty;
    product.description = request.body.description;
    product.productPrice = request.body.productPrice;
    product.save()
    .then(result=>{
        return response.redirect("/admin/dashboard");
    
    })
    .catch(err=>{
        console.log(err);
        return response.send("Error....");
    });
}
exports.addProductPage = (request, response, next) => {
    Category.fetchAllCategory()
        .then(results => {
            console.log(results);
            return response.render("admin/add_product.ejs", {
                title: "Add product",
                categories: results
            });

        })
        .catch(err => {
            console.log(err);
            return response.send("Erro.....");
        });
};
exports.productList = (request,response,next)=>{
    Product.fetchAll()
    .then(results=>{
        console.log(results);
       response.render("admin/product_list.ejs",{
         username: '',
         productList: results
       });
    })
    .catch(err=>{
        console.log(err);
    });
}
exports.getProductById = (request,response,next)=>{
    Product.fetchProductById(request.params.productid)
    .then(result=>{
        console.log(result);
         response.render('./admin/edit_product.ejs',{
            username : '',
            product: result[0]
         });
      
    })
    .catch(err=>{
       console.log(err);
    });
 };
 
exports.updateProduct =  (request,response)=>{
    let p = new Product();
    p.productid = request.body.productid;
    p.productName = request.body.productName;
    p.productPrice = request.body.productPrice;
    p.frontview = request.body.frontview;
    p.description = request.body.description;
    p.productQty = request.body.productQty;
    p.update().then(result=>{
       response.redirect("/admin/dashboard");
    }).catch(err=>{
       console.log(err);
       response.send("Error.....");
    });
 };
exports.deleteProduct = (request,response,next)=>{
    const productid = request.params.productid;
    Product.delete(productid).then(
        ()=>{
            //response.redirect("/user/product-list");
          response.send("Product Deleted...");
        }
    ).catch();
 };
