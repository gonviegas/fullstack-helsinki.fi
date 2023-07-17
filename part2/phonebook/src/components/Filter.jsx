export const Filter = ({ nameFilter, handleNameFilterChange }) => {
  return (
    <div>
      filter shown with{' '}
      <input value={nameFilter} onChange={handleNameFilterChange} />
    </div>
  )
}
