import request from 'superagent';
import Config from '../config/config';

const CLOUDINARY_UPLOAD_PRESET = Config.upload_preset;
const CLOUDINARY_UPLOAD_URL = Config.upload_url;

const upLoadFile = file => new Promise((resolve) => {
  const upload = request
    .post(CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    .field('file', file);
  upload.end((err, response) => {
    if (err) {
      return resolve(err);
    }
    if (response.body.secure_url !== '') {
      return resolve(response.body.secure_url);
    }
    return resolve(null);
  });
});

export default upLoadFile;
