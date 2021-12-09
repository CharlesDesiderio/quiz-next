import { useEffect, useRef, useState } from 'react'
import AnswerChoice from './components/AnswerChoice'
import Card from './components/Card'
import ResultAnswer from './components/ResultAnswer'
import Results from './components/Results'

const App = () => {

const questionList = [
  {
    question: 'Question 1',
    choices: {
      a: '1a',
      b: '1b',
      c: '1c',
      d: '1d'
    },
    correctAnswer: 'a',
    userGuess: ''
  },
  {
    question: 'Question 2',
    choices: {
      a: '2a',
      b: '2b',
      c: '2c',
      d: '2d'
    },
    correctAnswer: 'b',
    userGuess: ''
  },
  {
    question: 'Question 3',
    choices: {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd'
    },
    correctAnswer: 'c',
    userGuess: ''
  },
  {
    question: 'Question 4',
    choices: {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd'
    },
    correctAnswer: 'd',
    userGuess: ''
  },
  {
    question: 'Question 5',
    choices: {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd'
    },
    correctAnswer: 'a',
    userGuess: ''
  },
  {
    question: 'Question 6',
    choices: {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd'
    },
    correctAnswer: 'b',
    userGuess: ''
  },
  {
    question: 'Question 7',
    choices: {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd'
    },
    correctAnswer: 'c',
    userGuess: ''
  },
  {
    question: 'Question 8',
    choices: {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd'
    },
    correctAnswer: 'd',
    userGuess: ''
  },
  {
    question: 'Question 9',
    choices: {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd'
    },
    correctAnswer: 'a',
    userGuess: ''
  },
  {
    question: 'Question 10',
    choices: {
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd'
    },
    correctAnswer: 'b',
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
    <div>
      {
        quizOver ? 

        <div>
        <Results data={questions} />
        {
          questions.map((question, i) => {
            return <ResultAnswer key={i} question={question} i={i} />
          })
        }
      </div>

      :

      <div>
      <Card question={questions[currentQuestion].question}>
        <AnswerChoice pickAnswer={pickAnswer} choices={questions[currentQuestion].choices} />
      </Card>
      </div>

      }
    </div>
  )
}

export default App