import styles from './ResultAnswer.module.css'

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
  
  let correct = question.userGuess === question.correctAnswer
  let keysArr = Object.keys(question.choices)
  let valuesArr = Object.values(question.choices)
  let correctAnswer = [keysArr[keysArr.indexOf(question.correctAnswer)], valuesArr[keysArr.indexOf(question.correctAnswer)]]
  let userGuess = [keysArr[keysArr.indexOf(question.userGuess)], valuesArr[keysArr.indexOf(question.userGuess)]]

  return (
    <div className={styles.answers}>
      <div className={styles.thisAnswer}>
      <h4>#{i + 1} : { question.question }</h4>
        { !correct ? <div className={styles.wrongAnswer}>❌ {userGuess[0].toUpperCase()} : {userGuess[1]}</div> : ''}
        <div className={styles.rightAnswer}>✅ { correctAnswer[0].toUpperCase() } : { correctAnswer[1] } </div>
      </div>

    </div>
  )
}

export default ResultAnswer