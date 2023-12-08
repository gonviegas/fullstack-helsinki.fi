interface PartProps {
  name: string
  exerciseCount: number
  description?: string
  backgroundMaterial?: string
  groupProjectCount?: number
  requirements?: string[]
}

const style = {
  marginTop: '0.1em',
  marginBottom: '0.1em'
}

const Part = (props: PartProps) => {
  return (
    <>
      <h4 style={{ marginBottom: '0.5em' }}>
        {props.name} {props.exerciseCount}
      </h4>
      <p style={style}>{props.description}</p>
      {props.backgroundMaterial && (
        <p style={style}>submit to {props.backgroundMaterial}</p>
      )}
      {props.groupProjectCount && (
        <p style={style}>project exercises {props.groupProjectCount}</p>
      )}
      {props.requirements && (
        <p style={style}>
          required skills:
          {props.requirements?.map((req, idx) => {
            if (idx === 0) return <span key={idx}> {req}</span>
            return <span key={idx}>, {req}</span>
          })}
        </p>
      )}
    </>
  )
}

export default Part
