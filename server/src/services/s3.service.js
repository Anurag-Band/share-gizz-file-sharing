import s3 from "../config/s3.js";

/**
 * Uploads a file to AWS S3
 * @param {Object} file - The file object from multer
 * @param {string} finalFileName - The filename to save as
 * @returns {Promise<Object>} - The S3 upload result
 */
export const uploadToS3 = async (file, finalFileName) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `file-share-app/${finalFileName}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

/**
 * Deletes a file from AWS S3
 * @param {string} fileKey - The key of the file in S3
 * @returns {Promise<Object>} - The S3 delete result
 */
export const deleteFromS3 = async (fileKey) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  };

  return s3.deleteObject(params).promise();
};
