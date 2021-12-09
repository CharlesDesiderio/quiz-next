import styles from './Card.module.css'

interface cardProps {
  question: string
  children: React.ReactChild
}

const Card = ({ question, children }: cardProps) => {
  return (
    <div className={styles.card}>
      <h3>{question}</h3>
      {children}
    </div>
  )
}

export default Card