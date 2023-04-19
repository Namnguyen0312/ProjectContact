const Contact = require('../models/Contact.model');
const ApiError = require('../api-error');


class Methods {
    async findAll(req, res, next) {
        var documents = [];
        const namerequire = req.query.name;
        try {
            if (namerequire) {
                documents = await Contact.find({
                    name: { $regex: `${namerequire}`, $options: 'i' },
                });
            } else {
                documents = await Contact.find({});
            }
        }catch (error) {
            return next(
                new ApiError(
                    500,
                    'An error occurent while retrieving accounts',
                ),
            );
        }
        return res.send(documents);
    }   
    async create(req, res, next) {
        var data = req.body;
        if (!data.phone.trim()) {
            return next(new ApiError(400, 'Phone can not be empty'));
        }
        await Contact.create(data)
            .then((data) => res.send(data))
            .catch((error) => {
                return next(
                    new ApiError(
                        500,
                        'An error occurred while creating the accounts',
                    ),
                );
            });
    }
    async findById(req, res, next) {
        await Contact.findById(req.params.id)
            .then((data) => res.send(data))
            .catch((error) => next(new ApiError(404, 'contact not found')));
    }
    async update(req, res, next) {
        var dataUpdate = req.body;
        await Contact.findByIdAndUpdate(req.params.id, {
            $set: dataUpdate,
        })
            .then(() => res.send('Updated successfully'))
            .catch((error) => next(new ApiError(404, 'Contact not found')));
    }
    async delete(req, res, next) {
        await Contact.findByIdAndDelete(req.params.id)
            .then(() => res.send('Deleted successfully'))
            .catch((error) => next(new ApiError(404, 'Account not found')));
    }
    async findAllFavorite(req, res, next){
        var documents = [];
        try{
            documents = await Contact.find({ favorite : true });
        }catch (error) {
            return next(
                new ApiError(
                    500,
                    'An error occurent while retrieving accounts',
                ),
            );
        }
        return res.send(documents);
    }
    async deleteAll(req, res, next) {
        await Contact.deleteMany({})
            .then((result) =>
                res.send(
                    `${result.deletedCount} account were deleted successfully`,
                ),
            )
            .catch((error) =>
                next(
                    new ApiError(
                        500,
                        'An error occurred while removing all contacts',
                    ),
                ),
            );
    }
}
module.exports = new Methods();