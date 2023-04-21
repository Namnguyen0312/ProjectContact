const Account = require('../models/Account.model');
const ApiError = require('../api-error');
// const AccountModel = require('../models/Account.model');

class Methods {
    async findAll(req, res, next) {
        var documents = [];
        const namerequire = req.query.name;
        try {
            if (namerequire) {
                documents = await Account.find({
                    name: { $regex: `${namerequire}`, $options: 'i' },
                }).populate("mycontacts");
            } else {
                documents = await Account.find({}).populate("mycontacts");
            }
        } catch (error) {
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
        var data = { ...req.body };
        if (!data.name.trim()) {
            return next(new ApiError(400, 'Name can not be empty'));
        }
        await Account.create({
            name: data.name,
            username: data.username,
            password: data.password,
            phone: data.phone,
            mycontacts: data.mycontacts,
        })
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
    async addContact(req, res, next) {
        const id = req.params.id;
        const contactId = req.params.contactId;
        var accountUpdate = await Account.findById(id)
            .then((data) => data)
            .catch((err) => console.log(err));

        accountUpdate.mycontacts.push(contactId);
        await accountUpdate
            .save()
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
    async removeContact(req, res, next) {
        const id = req.params.id;
        const contactId = req.params.contactId;
        const accountUpdate = await Account.findById(id)
            .populate('mycontacts')
            .then((data) => data)
            .catch((err) => console.log(err));
        var index = -1;
        accountUpdate.mycontacts.forEach((contact, i) => {
            if (JSON.parse(JSON.stringify(contact._id)) === contactId) {
                index = i;
            }
        });
        if (index !== -1) {
            accountUpdate.mycontacts.splice(index, 1);
        }
        await accountUpdate
            .save()
            .then((data) => res.send(data))
            .catch((error) => {
                return next(
                    new ApiError(
                        500,
                        'An error occurred while delete the video',
                    ),
                );
            });
    }
    async findById(req, res, next) {
        await Account.findById(req.params.id)
            .populate("mycontacts")
            .then((data) => res.send(data))
            .catch((error) => next(new ApiError(404, 'Account not found')));
    }
    async findOneAccount(req, res, next) {
        const data = req.body;
        await Account.findOne({
            username: data.username,
            password: data.password,
        })
            .populate("mycontacts")
            .then((data) => res.send(data))
            .catch((error) => {
                next(new ApiError(404, 'Account not found'));
            });
    }
    async delete(req, res, next) {
        await Account.findByIdAndDelete(req.params.id)
            .then(() => res.send('Deleted successfully'))
            .catch((error) => next(new ApiError(404, 'Account not found')));
    }
    async deleteAll(req, res, next) {
        await Account.deleteMany({})
            .then((result) =>
                res.send(
                    `${result.deletedCount} account were deleted successfully`,
                ),
            )
            .catch((error) =>
                next(
                    new ApiError(
                        500,
                        'An error occurred while removing all accounts',
                    ),
                ),
            );
    }
    async update(req, res, next) {
        var id = req.params.id;
        var data = req.body;
        var newAccount = { ...data };
        if (!data.name.trim()) {
            return next(new ApiError(400, 'Name can not be empty'));
        }
        await Account.findByIdAndUpdate(id, { $set: newAccount })
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
}
module.exports = new Methods();