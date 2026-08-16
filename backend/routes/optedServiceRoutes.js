const express = require('express');
const router = express.Router();
const optedServiceController = require('../controllers/optedServiceController');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, optedServiceController.list);
router.post('/', requireAuth, optedServiceController.create);
router.delete('/:id', requireAuth, optedServiceController.remove);

module.exports = router;
