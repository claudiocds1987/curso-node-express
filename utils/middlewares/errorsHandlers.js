const { config } = require('../../config');

function logErrors(err, req, res, next){
    console.log(err.stack);
    next(err);
}

// para lado cliente para que devuelva el error como json en vez de mostrarle una pagina de error
function clientErrorHandler(err, req, res, next){
    // catch errors for AJAX request
    if(req.xhr){
        res.status(500).json({ err: err.message });
    }else{
        next(err);
    }
}

// middleware por defecto
function errorHandler(err, req, res, next){
    // catch errors while streaming
    if(res.headersSent){
        next(err);
    }

    // pregunto si estoy en modo produccion ("config" es la carpeta que tiene un index.js con las
    // variables de entorno que utilizo para conexión a MongoDB.
    if(!config.dev){
        // borro el stack para que el cliente no vea la informacion
        delete err.stack;
    }
    res.status(err.status || 500);
    res.render("error", {error: err });
}

// exportando los middlewares
module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler
}