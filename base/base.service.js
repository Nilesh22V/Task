/**
 * Base service to handel single table operation for CRUD.
 * Please override the methods in the extended service class for multi table oprations
 *
 */
class BaseService {
    constructor(model) {
        this.model = model;

        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
    }

    async create(createDto) {
        const record = await this.model.create(createDto);
        return record;
    }

    async update(id, updateDto) {
        const record = await this.model.findByPk(id);

        if (record) {
            return record.update(updateDto);
        }

        return record;
    }
}

module.exports = BaseService;
