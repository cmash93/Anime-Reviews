const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveAnime,
  deleteAnime,
  login,
} = require('../../controllers/userController');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveAnime);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/anime/:animeId').delete(authMiddleware, deleteAnime);

module.exports = router;