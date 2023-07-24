export const Countries = ({ country, setSelectedCountry }) => {
  return (
    <div>
      {country.name.common}{' '}
      <button onClick={() => setSelectedCountry(country)}>show</button>
    </div>
  )
}
