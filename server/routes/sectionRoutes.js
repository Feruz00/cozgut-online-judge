const { createSection, createSubSection, getAllSections, getSubSections, deleteSection, updateSection,
    getData,
    deleteSubSection,
    updateSubSection,
    getTree,
    getSubSection,
    getProblemsBySubsection
} = require('../controller/sectionController')
const router = require('express').Router()

router.get('/', getData)

// section doretmek
router.post('/', createSection)

// subsection doretmek
router.post('/sub', createSubSection)

// subsection almak
router.get('/current/:id', getSubSection )
// hemme sectionlary almak
router.get('/all', getAllSections)

// sectionyn subsectionlaryny almak
router.get('/sub/:id', getSubSections)

//subsectiondaki meseleleri almak
router.get('/problem/:id', getProblemsBySubsection)

router.get('/parent', getTree)

// section udalit etmek

router.delete('/section/:id', deleteSection)
router.delete('/sub/:id', deleteSubSection)
//
router.put('/section/:id', updateSection)
router.put('/sub/:id', updateSubSection)
module.exports = router