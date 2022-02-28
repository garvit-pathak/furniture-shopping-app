const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const adminRouter = require('./routes/admin.routes');
const categoryRouter = require('./routes/category.routes');
const productRouter = require('./routes/product.routes');
const { ppid } = require('process')
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(session({
    secret: 'dfkjfrrereprxvncvncvnrorererp'
}));

app.use("/admin",adminRouter);
app.use("/category",categoryRouter);
app.use("/product",productRouter);


app.listen(3000);
console.log("server is runing...");