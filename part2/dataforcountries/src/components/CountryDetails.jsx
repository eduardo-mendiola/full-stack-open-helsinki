import React, { useEffect, useState } from "react"

export default function CountryDetails({ country }) {
    const name = country.name?.common || 'Unknown'
    const capital = country.capital?.[0] || 'N/A'
    const area = country.area ?? 'N/A'
    const languages = country.languages ? Object.values(country.languages) : []
    const flagSrc = country.flags?.png || country.flags?.svg || ''

    // Weather state
    const [weather, setWeather] = useState(null)
    const [weatherStatus, setWeatherStatus] = useState('idle') // 'idle' | 'loading' | 'error'

    useEffect(() => {
        const latlng = country.capitalInfo?.latlng
        if (!latlng || latlng.length < 2) {
            setWeather(null)
            setWeatherStatus('idle')
            return
        }

        const [latitude, longitude] = latlng
        setWeatherStatus('loading')
        const controller = new AbortController()

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(
            latitude
        )}&longitude=${encodeURIComponent(
            longitude
        )}&current_weather=true&temperature_unit=celsius&windspeed_unit=kmh`

        fetch(url, { signal: controller.signal })
          .then((res) => {
            if (!res.ok) throw new Error('Weather fetch failed')
            return res.json()
          })
          .then((data) => {
            setWeather(data.current_weather || null)
            setWeatherStatus('idle')
          })
          .catch((err) => { 
            if (err.name === 'AbortError') return
            console.error(err)
            setWeather(null)
            setWeatherStatus('error')
          })
        
        return () => controller.abort()
    }, [country])

    return (
        <div>
            <h2>{name}</h2>
            <p>Capital: {capital}</p>
            <p>Area: {area} km²</p>

            <h3>Languages:</h3>
            <ul>
                {languages.map((lang) => {
                    <li key={lang}>{lang}</li>
                })}
            </ul>

            {flagSrc && <img src={flagSrc} alt={`flag of {name}`} width="150" />}

            <hr />

            <h3>Weather in {capital}</h3>
            {weatherStatus === 'loading' && <p>Loading weather...</p>}
            {weatherStatus === 'erro' && <p>Error loading weather</p>}
            {weatherStatus !== 'loading' && weather === null && (
              <p>No weather data available for this capital.</p>
            )}
            {weather && (
              <div>
                <p>Temperature: {weather.temperature} °C</p>
                <p>Wind speed: {weather.windspeed} km/h</p>
                <p>Weather time: {weather.time}</p>
              </div>
            )}
        </div>
    )
}