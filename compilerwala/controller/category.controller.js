const Category = require('../model/category.model');
const path = require('path');
exports.addCategory = (request,response,next)=>{
  let category = new Category();
  category.categoryName = request.body.categoryName;
  category.categoryImage = request.file.filename;
  category.save()
  .then(result=>{
    response.redirect("/admin/dashboard");
  })
  .catch(err=>{
    response.send("Error.......");
  });
};
exports.addCategoryPage = (request, response, next) => {
  Category.fetchAllCategory()
      .then(results => {
          console.log(results);
          return response.render("admin/add_category.ejs", {
              title: "delete product",
              categories: results
          });

      })
      .catch(err => {
          console.log(err);
          return response.send("Erro.....");
      });
};