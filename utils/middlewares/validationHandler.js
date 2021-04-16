function validate(data, schema){
    return false;
}

function validationHandler(schema, check = "body"){
    return function(req, res, next){
        const error = validate(req[check], schema);
        // si el error es verdadero se activan los errores de errorsHandlers.js
        error ?  next (new Error(error)) : next();
    }
}

module.exports = validationHandler;