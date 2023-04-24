import { writeFileSync } from "fs";

export default async function submit(req, res) {
    if (req.method !== "POST") {
      return res.status(405);
    }

    const uuid = Math.random().toString(26).slice(2);
    await writeFileSync(`./public/db/${uuid}.json`, JSON.stringify(req.body));
    res.status(201).json({ uuid });
}
