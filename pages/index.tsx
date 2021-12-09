import { useEffect, useRef, useState } from 'react'
import AnswerChoice from './components/AnswerChoice'
import Card from './components/Card'
import ResultAnswer from './components/ResultAnswer'
import Results from './components/Results'

import styles from './index.module.css'

const App = () => {
  
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
  return pickedQuestions
}

let initialState = pickQuestions()

const [questions, setQuestions] = useState(initialState)
const [currentQuestion, setCurrentQuestion] = useState(0)
const [quizOver, setQuizOver] = useState(false)

const pickAnswer = (answer: string) => {
  console.log(currentQuestion)
  let newQuestions = questions
  newQuestions[currentQuestion].userGuess = answer
  setQuestions([...newQuestions])
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
  } else {
    setQuizOver(true)
  }
}

  return (
    <div className={styles.container}>
      {
        quizOver ? 

        <div className={styles.results}>
        <Results data={questions} />
        {
          questions.map((question, i) => {
            return <ResultAnswer key={i} question={question} i={i} />
          })
        }
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