interface TotalProps {
  exercises: number
}

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.exercises}</p>
}

export default Total
