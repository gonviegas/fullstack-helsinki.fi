import Part from './Part'
import { CoursePart } from '../../ts/types.ts'
import { assertNever} from '../../ts/utils.ts'

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    <>
      {props.courseParts.map((part, idx) => {
        switch (part.kind) {
          case 'basic':
            return (
              <Part
                key={idx}
                name={part.name}
                exerciseCount={part.exerciseCount}
                description={part.description}
              />
            )
          case 'group':
            return (
              <Part
                key={idx}
                name={part.name}
                exerciseCount={part.exerciseCount}
                groupProjectCount={part.groupProjectCount}
              />
            )
          case 'background':
            return (
              <Part
                key={idx}
                name={part.name}
                exerciseCount={part.exerciseCount}
                backgroundMaterial={part.backgroundMaterial}
                description={part.description}
              />
            )
          case 'special':
            return (
              <Part
                key={idx}
                name={part.name}
                exerciseCount={part.exerciseCount}
                description={part.description}
                requirements={part.requirements}
              />
            )
          default:
            return assertNever(part)
        }
      })}
    </>
  )
}

export default Content
