const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');
router
    .route('/mycontacts/:id/:contactId')
    .put(accountController.addContact)
    .delete(accountController.removeContact);
router
    .route('/:id')
    .get(accountController.findById)
    .delete(accountController.delete)
    .put(accountController.update)
router
    .route('/login')
    .post(accountController.findOneAccount);
router
    .route('/')
    .get(accountController.findAll)
    .post(accountController.create)
    .delete(accountController.deleteAll);
module.exports = router;