const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Buat barang baru
router.post('/', itemController.createItem);

// Dapatkan semua barang
router.get('/', itemController.getAllItems);

// Dapatkan barang berdasarkan ID
router.get('/:id', itemController.getItemById);

// Perbarui barang berdasarkan ID
router.put('/:id', itemController.updateItem);

// Hapus barang berdasarkan ID
router.delete('/:id', itemController.deleteItem);

module.exports = router;
