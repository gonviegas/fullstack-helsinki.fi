export const Filter = ({ nameFilter, setNameFilter }) => {
  const handleNameFilterChange = event => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      filter shown with{' '}
      <input value={nameFilter} onChange={handleNameFilterChange} />
    </div>
  )
}
