const express = require('express');
const router = express.Router();
const siswaControllers = require('../controllers/siswaControllers');

router.get('/', siswaControllers.getAll);            
router.get('/:id', siswaControllers.getById);        
router.post('/', siswaControllers.create); 
router.put('/:id', siswaControllers.update); 
router.delete('/:id', siswaControllers.remove);

module.exports = router;


