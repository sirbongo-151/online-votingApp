import multer from "multer";
import { Readable } from "stream";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;