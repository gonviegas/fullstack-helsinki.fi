import { Header } from './Header'
import { Content } from './Content'

export const Course = ({ courses }) => {
  return (
    <>
      {courses.map(course => (
        <div key={course.id}>
          <Header courseName={course.name} />
          <Content parts={course.parts} />
        </div>
      ))}
    </>
  )
}
