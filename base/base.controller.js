class BaseController {
    constructor(responseService, service, dto) {
        this.responseService = responseService;
        this.service = service;
        this.dto = dto;

        this.create = this.create.bind(this);
    }

    async create(req, res) {
        try {
            const createDto = this.dto.create(req.body);
            const record = await this.service.create(createDto);
            this.responseService.created(req, res, record);
        } catch (e) {
            this.responseService.fail(req, res, e);
        }
    }  
}

module.exports = BaseController;
