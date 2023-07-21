export const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      find countries{' '}
      <input
        value={filter}
        onChange={e => handleFilterChange(e.target.value)}
      />
    </div>
  )
}
