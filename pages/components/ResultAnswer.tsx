interface resultAnswerProps {
  question: {
  question: string
  choices: {
    a: string
    b: string
    c: string
    d: string
  }
  correctAnswer: string
  userGuess: string
}
  i: number
}

const ResultAnswer = ({ question, i }: resultAnswerProps) => {
  return (
    <div>
      Question #{i + 1}
      { question.question }
      
      { question.userGuess !== question.correctAnswer ? `Incorrect!` : `Correct!` }


    </div>
  )
}

export default ResultAnswer