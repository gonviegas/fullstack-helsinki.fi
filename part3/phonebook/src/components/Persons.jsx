export const Persons = ({ person, deletePerson }) => {
  return (
    <div>
      <div>
        {`${person.name} ${person.number}`}{' '}
        <button onClick={() => deletePerson(person)}>delete</button>
      </div>
    </div>
  )
}
