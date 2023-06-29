const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'firImage') {
      cb(null, './uploads/fir-images');
    } else if (file.fieldname === 'firVideo') {
      cb(null, './uploads/fir-videos');
    } else if (file.fieldname === 'profile') {
      cb(null, './uploads/user-profiles');
    } else if (file.fieldname === 'complaintImage') {
      cb(null, './uploads/complaint-images');
    } else if (file.fieldname === 'crimeReportImage') {
      cb(null, './uploads/crime-report-images');
    } else if (file.fieldname === 'notifyImage') {
      cb(null, './uploads/notification-images');
    } else if (file.fieldname === 'userImage') {
      cb(null, './uploads/user-images');
    } else {
      cb(new Error('Invalid fieldname'));
    }
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}--${Date.now()}${ext}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Invalid file format. Only jpg, jpeg, png, and gif are allowed.'), false);
  }
  cb(null, true);
};

const videoFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(mp4|mov|avi|mkv)$/)) {
    return cb(new Error('Invalid file format. Only mp4, mov, avi, and mkv are allowed.'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.fieldname === 'firImage' || file.fieldname === 'profile' || file.fieldname === 'complaintImage' || file.fieldname === 'crimeReportImage' || file.fieldname === 'notifyImage' || file.fieldname === 'userImage') {
      imageFileFilter(req, file, cb);
    } else if (file.fieldname === 'firVideo') {
      videoFileFilter(req, file, cb);
    } else {
      cb(new Error('Invalid fieldname'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
