import { connectToDatabase } from "../../lib/mongodb"

export default async (req, res) => {

  // body: JSON.stringify({ game: gameId, questionNumber: currentQuestion, questions: questions })

  // console.log(req.body)

  const { db } = await connectToDatabase();

  const results = await db.collection('quizData').findOne({ game: req.body.game })
  console.log(results)


  if (!results) {
    db.collection('quizData').insertOne({ game: req.body.game, questions: req.body.questions, questionNumber: req.body.questionNumber })
    res.json('new entry')
  } else {
    db.collection('quizData').findOneAndReplace({ game: req.body.game }, { game: req.body.game, questions: req.body.questions, questionNumber: req.body.questionNumber })
    console.log(results)
  }

  res.json(results);
};