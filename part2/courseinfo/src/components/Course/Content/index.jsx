import { Part } from './Part'
import { Total } from './Total'

export const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, i) => (
        <Part
          key={part.id}
          part={parts[i].name}
          exercises={parts[i].exercises}
        />
      ))}
      <Total parts={parts} />
    </div>
  )
}
