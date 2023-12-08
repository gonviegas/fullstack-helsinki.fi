interface ContentProps {
  parts: {
    name: string
    exerciseCount: number
  }[]
}

const Header = (props: ContentProps) => {
  return (
    <>
      <p>
        {props.parts[0].name} {props.parts[0].exerciseCount}
      </p>
      <p>
        {props.parts[1].name} {props.parts[1].exerciseCount}
      </p>
      <p>
        {props.parts[2].name} {props.parts[2].exerciseCount}
      </p>
    </>
  )
}

export default Header
