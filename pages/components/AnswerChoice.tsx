import styles from './AnswerChoice.module.css'
interface answerChoiceProps {
  choices: {
    a: string
    b: string
    c: string
    d: string
  }
  pickAnswer: (ans: string) => void
}

const AnswerChoice = ({ choices, pickAnswer }: answerChoiceProps) => {

  return (
    <div className={styles.choiceList}>
      <div onClick={() => pickAnswer('a')}>{choices.a}</div>
      <div onClick={() => pickAnswer('b')}>{choices.b}</div>
      <div onClick={() => pickAnswer('c')}>{choices.c}</div>
      <div onClick={() => pickAnswer('d')}>{choices.d}</div>
    </div>
  )
}

export default AnswerChoice