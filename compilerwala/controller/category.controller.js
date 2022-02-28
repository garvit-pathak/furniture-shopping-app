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
exports.categoryList = (request,response,next)=>{
  Category.fetchAll()
  .then(results=>{
     response.render("admin/category_list.ejs",{
       username: '',
       categoryList: results
     });
  })
  .catch(err=>{
      console.log(err);
  });
}
exports.getCategoryById = (request,response,next)=>{
  Category.fetchCategoryById(request.params.productid)
  .then(result=>{
    if(result.length>0){
       response.render('admin/edit_category.ejs',{
          username : '',
          category: result[0]
       });
    }
  })
  .catch(err=>{
     console.log(err);
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
