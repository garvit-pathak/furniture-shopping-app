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
exports.deleteProduct = (request,response,next)=>{
    let product = new Product(productid);
    product.productid  = request.params.productid;
    product.delete()
    .then(result=>{
        return response.redirect("/admin/dashboard");
    })
    .catch(err=>{
        console.log(err);
        return response.send("Error....");
    });
}

exports.deleteProductPage = (request, response, next) => {
         Category.fetchAllCategory()
        .then(results => {
            return response.render("admin/delete_product.ejs", {
                title: "delete product",
                products: results
            });

        })
        .catch(err => {
            console.log(err);
            return response.send("Erro.....");
        });
        Product.fetchAllProduct()
        .then(results => {
            return response.render("admin/delete_product.ejs", {
                title: "delete product",
                products: results
            });

        })
        .catch(err => {
            console.log(err);
            return response.send("Erro.....");
        });
};