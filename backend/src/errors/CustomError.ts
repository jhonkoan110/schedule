class CustomError {
    constructor() {
        Error.apply(this, arguments);
    }
}

CustomError.prototype = new Error();

export default CustomError;
