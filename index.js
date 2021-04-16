const express = require("express");
const path = require("path");
const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');

const {
  logErrors,
  clientErrorHandler,
  errorHandler
} = require('./utils/middlewares/errorsHandlers');

// app inicializacion de la aplicacion
const app = express();

// middleware para que express entienda el formato json enviado en el request post
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// static files
app.use("/static", express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); // view pug

// routes
app.use("/products", productsRouter);
app.use("/api/products", productsApiRouter);

// redirect pagina principal
app.get('/', function(req, res){
    res.redirect('/products');
});

// Middlewares error Handlers (siempre van al final de todas las rutaa)
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// escuchando puerto
const server = app.listen(8000, function(){
    console.log(`Listening http://localhost:${server.address().port}`);
});