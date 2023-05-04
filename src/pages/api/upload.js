import formidable from "formidable";
import path from "path";
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function upload(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = new formidable.IncomingForm({
    keepExtensions: true,
    maxFileSize: 200 * 1024 * 1024,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return resolve();
      }

      if (!files.image) {
        res.status(422).json({ error: "Bad request: missing image field" });
        return resolve();
      }

      const ext = path.extname(files.image.filepath);
      const uuid = Math.random().toString(26).slice(2);
      const oldPath = files.image.filepath;
      await fs.copyFile(oldPath, `./public/images/${uuid}${ext}`);

      res.status(201).json({
        uuid,
        url: `/images/${uuid}${ext}`,
      });
      return resolve();
    });
  });
}
