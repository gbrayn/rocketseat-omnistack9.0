const router = require('express').Router()
const multer = require('multer')
const uploadConfig = require('./config/upload')

const SpotController = require('./controllers/SpotController')
const SessionController = require('./controllers/SessionController')
const DashBoardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')
const upload = multer(uploadConfig)

router
  .route('/sessions')
  .post(SessionController.store)
  .get(SessionController.show)

router
  .route('/spots')
  .post(upload.single('thumbnail'), SpotController.store)
  .get(SpotController.index)
router.route('/spots/:spotid/bookings').post(BookingController.store)

router.route('/dashboard').get(DashBoardController.show)

router.route('/bookings/:booking_id/approvals').post(ApprovalController.store)
router.route('/bookings/:booking_id/rejections').post(RejectionController.store)

module.exports = router
