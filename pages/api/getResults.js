import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

  const { db } = await connectToDatabase();

  const results = await db.collection('quizData').findOne({ game: req.body.game })

  res.json(results);
};