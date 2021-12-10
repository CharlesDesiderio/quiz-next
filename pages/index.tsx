import { Key, useEffect, useRef, useState } from 'react'
import AnswerChoice from './components/AnswerChoice'
import Card from './components/Card'
import ResultAnswer from './components/ResultAnswer'
import Results from './components/Results'
// import clientPromise from '../lib/mongodb'

import styles from './index.module.css'

interface appProps {
  isConnected: boolean
}

const App = ({ isConnected }: appProps) => {
  
const questionList = [
  {
    question: 'In 1768, Captain James Cook set out to explore which ocean?',
    choices: {
      a: 'Pacific Ocean',
      b: 'Atlantic Ocean',
      c: 'Indian Ocean',
      d: 'Arctic Ocean'
    },
    correctAnswer: 'a',
    userGuess: ''
  },
  {
    question: 'Which of the following disorders is the fear of being alone?',
    choices: {
      a: 'Agoraphobia',
      b: 'Aerophobia',
      c: 'Acrophobia',
      d: 'Arachnophobia'
    },
    correctAnswer: 'a',
    userGuess: ''
  },
  {
    question: 'What is the speed of sound?',
    choices: {
      a: '120 km/h',
      b: '1,200 km/h',
      c: '400 km/h',
      d: '700 km/h'
    },
    correctAnswer: 'b',
    userGuess: ''
  },
  {
    question: 'What do we call a newly hatched butterfly?',
    choices: {
      a: 'A moth',
      b: 'A butter',
      c: 'A caterpillar',
      d: 'A chrysalis'
    },
    correctAnswer: 'c',
    userGuess: ''
  },
  {
    question: 'What is the main component of the sun?',
    choices: {
      a: 'Liquid lava',
      b: 'Gas',
      c: 'Molten iron',
      d: 'Rock'
    },
    correctAnswer: 'b',
    userGuess: ''
  },
  {
    question: 'Which two months are named after Emperors of the Roman Empire?',
    choices: {
      a: 'January and February',
      b: 'March and April',
      c: 'May and June',
      d: 'July and August'
    },
    correctAnswer: 'd',
    userGuess: ''
  },
  {
    question: 'Which of the following animals can run the fastest?',
    choices: {
      a: 'Cheetah',
      b: 'Leopard',
      c: 'Tiger',
      d: 'Lion'
    },
    correctAnswer: 'a',
    userGuess: ''
  },
  {
    question: 'Which of the following actors was the first one to play James Bond?',
    choices: {
      a: 'Timothy Dalton',
      b: 'Roger Moore',
      c: 'Sean Connery',
      d: 'George Lazenby'
    },
    correctAnswer: 'c',
    userGuess: ''
  },
  {
    question: 'In which country is Transylvania?',
    choices: {
      a: 'Bulgaria',
      b: 'Romania',
      c: 'Croatia',
      d: 'Serbia'
    },
    correctAnswer: 'b',
    userGuess: ''
  },
  {
    question: 'Which was the first film by Disney to be produced in colour?',
    choices: {
      a: 'Toy Story',
      b: 'Sleeping Beauty',
      c: 'Snow White and the Seven Dwarfs',
      d: 'Cinderella'
    },
    correctAnswer: 'c',
    userGuess: ''
  }
]

// Randomly pick 5 questions to be in the game.
const pickQuestions = () => {

    let allQuestions = questionList
    let pickedQuestions = []
    for (let i = 0; i < 5; i++) {
      let choice = Math.floor(Math.random() * (questionList.length))
      pickedQuestions.push(allQuestions[choice])
      allQuestions.splice(choice, 1)
    }

    if (typeof window !== "undefined") {
      if (window.localStorage.getItem('marbleQuiz')) {
        return JSON.parse(window.localStorage.getItem('marbleQuiz')!).questions
      } else {
        return pickedQuestions
      }
    } else {
      return pickedQuestions
    }
}

let initialState = pickQuestions()
let initialQuestion = 0

if (typeof window !== "undefined") {
  if (window.localStorage.getItem('marbleQuiz'))   {
    initialQuestion = JSON.parse(window.localStorage.getItem('marbleQuiz')!).currentQuestion
  }
}

let initialTimestamp = Date.now()
if (typeof window !== "undefined") {
  if (window.localStorage.getItem('marbleQuiz'))   {
    initialTimestamp = JSON.parse(window.localStorage.getItem('marbleQuiz')!).gameId
  }
}

const [questions, setQuestions] = useState(initialState)
const [currentQuestion, setCurrentQuestion] = useState(initialQuestion)
const [quizOver, setQuizOver] = useState(false)
const [gameId, setGameId] = useState(initialTimestamp)
const [dbQuestions, setDbQuestions] = useState([])

const newQuiz = () => {
  setQuestions(pickQuestions())
  setCurrentQuestion(0)
  setQuizOver(false)
  setGameId(Date.now())
}

const getResults = async () => {
  const response = await fetch('/api/getResults', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ game: gameId})
  })
  .then((res) => {
    return res.json()
  })
  .then(data => setDbQuestions(data.questions))
}

const pickAnswer = (answer: string) => {
  
  let localData = { questions, currentQuestion, quizOver, gameId }

  window.localStorage.setItem("marbleQuiz", JSON.stringify(localData))

updateDatabase()

  let newQuestions = questions!
  newQuestions[currentQuestion].userGuess = answer
  setQuestions([...newQuestions])
  if (currentQuestion < questions!.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
  } else {
    setQuizOver(true)

    // Send all data to back end with gameID here
    updateDatabase()    

    getResults()

    if (typeof window !== "undefined") {
      window.localStorage.removeItem("marbleQuiz")
    }
  }
}

const updateDatabase = async () => {
  const response = await fetch('/api/saveQuestion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ game: gameId, questionNumber: currentQuestion, questions: questions })
  })
  // const data = await response.json()
}

  return (
    <div className={styles.container}>
      <div className={styles.connection}>{ isConnected ? 'DB ✅' : 'DB ❌' }</div>
      {
        quizOver ? 

        <div className={styles.results}>
        <Results data={dbQuestions} />
        {
          questions.map((question: { question: string; choices: { a: string; b: string; c: string; d: string }; correctAnswer: string; userGuess: string }, i: number) => {
            return <ResultAnswer key={i} question={question} i={i} />
          })
        }
        <button onClick={newQuiz}>New Quiz</button>
      </div>

      :

      <div className={styles.question}>
      <Card question={questions[currentQuestion].question}>
        <AnswerChoice pickAnswer={pickAnswer} choices={questions[currentQuestion].choices} />
      </Card>
      </div>

      }
    </div>
  )
}

export default App

export async function getServerSideProps() {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    // await clientPromise
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
