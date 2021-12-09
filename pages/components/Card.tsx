interface cardProps {
  question: string
  children: React.ReactChild
}

const Card = ({ question, children }: cardProps) => {
  return (
    <div>
      {question}
      {children}
    </div>
  )
}

export default Card