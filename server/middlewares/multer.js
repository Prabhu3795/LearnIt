import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "uploads/";

    if (file.mimetype.startsWith("image/")) {
      folder += "thumbnails"; 
    } else if (file.mimetype.startsWith("video/")) {
      folder += "lectures"; 
    } else {
      return cb(new Error("Only images and videos are allowed"));
    }

    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${uuid()}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed"), false);
  }
};

export const uploadImage = multer({ storage, fileFilter }).single("image");
export const uploadVideo = multer({ storage, fileFilter }).single("file");
