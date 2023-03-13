const Router = require('../framework/Router');
const controller = require('./user-controller')
const router = new Router();



router.get('/films', controller.getFilms)
router.put('/films', controller.updateFilms)
router.post('/films', controller.createFilm)
router.delete('/films', controller.deleteFilm)

router.get('/genres', controller.getGenres)
router.put('/genres', controller.updateGenre)
router.post('/genres', controller.createGenre)
router.delete('/genres', controller.deleteGenre)


module.exports = router
