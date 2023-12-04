const { createLang, editLang, deleteLang, getLangs } = require('../controller/languageController')

const router = require('express').Router()

// taze dil goshmak
router.post('/', createLang)

// dilde uytgesmelerini girizmek
router.put('/:id', editLang)

//dili udalit etmek
router.delete('/', deleteLang)

// hemme dilleri almak
router.get('/', getLangs)

module.exports = router