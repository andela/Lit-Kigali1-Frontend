import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = process.env.UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = process.env.UPLOAD_URL;
const upLoadFile = file => new Promise((resolve) => {
  const upload = request
    .post(CLOUDINARY_UPLOAD_URL)
    .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    .field('resource_type', 'auto')
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
