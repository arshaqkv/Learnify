import multer from 'multer';

// Set up storage configuration (store files in memory as Buffer or disk)
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

export { upload };
