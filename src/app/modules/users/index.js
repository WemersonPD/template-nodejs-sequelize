const express = require('express');
const router = express.Router();

const HANDLERS = {
  create: require('./handlers/create'),
  getAll: require('./handlers/getAll'),
  update: require('./handlers/update'),
  delete: require('./handlers/delete'),
};

router.post('/', HANDLERS.create);
router.get('/', HANDLERS.getAll);
router.put('/:id', HANDLERS.update);
router.delete('/:id', HANDLERS.delete);

module.exports = router;
