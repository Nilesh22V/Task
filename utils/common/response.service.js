const HttpStatus = require('http-status');
const constants = require('../config/constant.config');

class ResponseService {
    constructor() {
        this.send = this.send.bind(this);
    }
    
        async send(req, res, httpStatus, success, data, errors) {
            const response = {
                success,
                errors: success ? null : errors,
                data
            };
    
            res.status(httpStatus).json(response);
        }
    
        fail(req, res, e) {
            this.send(
                req,
                res,
                HttpStatus.INTERNAL_SERVER_ERROR,
                false,
                null,
                e.errors || e.message
            );
        }
    
        created(req, res, record) {
            this.send(req, res, HttpStatus.CREATED, true, record);
        }
    
        success(req, res, data) {
            this.send(req, res, HttpStatus.OK, true, data);
        }
    }
    



module.exports = new ResponseService();
