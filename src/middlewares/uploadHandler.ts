//import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
//import multerS3 from "multer-s3";
import { config } from "dotenv";

config();

//const accessKeyId = String(process.env.AWS_ACCESS_KEY_ID);
//const secretAccessKey = String(process.env.AWS_SECRET_ACCESS_KEY);
//const region = String(process.env.AWS_S3_REGION);
//const bucket = String(process.env.BUCKET_NAME);

/*const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});*/

const upload = multer({
  /*storage: multerS3({
    s3: s3Client,
    bucket,
    acl: "public-read",
    key: function (_req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),*/
});

export const uploadHandler = upload.array("file", 1);

/*
<form action="/upload" method="POST" enctype="multipart/form-data">
    <input type="file" name="image">
    <button type="submit">Upload</button>
</form>
*/
