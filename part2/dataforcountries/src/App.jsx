import { useState} from 'react'
import './App.css'
import CountryDetails from './components/CountryDetails'
import CountryList from './components/CountryList'
import useCountries from './hooks/useCountries'

function App() {
  const [query, setQuery] = useState('')
  const { countries, status } = useCountries(query)
  

  return (
    <div className='app'>
      <h1>Country finder</h1>

      <label htmlFor="find_countries">Find countries </label>
      <input 
        type="text"
        id="find_countries"
        name="find_countries"
        placeholder="Type a country name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <p>Search value: {query}</p>

      <div>
        <p>Status: {status}</p>
        <p>Matches: {countries.length}</p>
      </div>

    {status === 'loading' && <p>Loading...</p>}
    {status === 'error' && <p>Error fetching countries</p>}

    {countries.length > 10 && (
      <p>Too many matches, specify another filter</p>
    )}

    {countries.length > 1 && countries.length <= 10 && (
      <CountryList countries={countries} onShow={(name) => setQuery(name)} />
    )}

    {countries.length === 1 && <CountryDetails country={countries[0]} /> }
    </div>
  )
}

export default App
