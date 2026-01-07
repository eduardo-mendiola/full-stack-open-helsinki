import { useState, useEffect } from 'react'

export default function useCountries(query) {
  const [countries, setCountries] = useState([])
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'error'

  useEffect(() => {
    if (!query) {
      setCountries([])
      setStatus('idle')
      return
    }

    setStatus('loading')
    const controller = new AbortController()
    const timer = setTimeout(() => {
      fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(
          query.trim()
        )}?fields=name,capital,area,flags,languages,capitalInfo`,
        { signal: controller.signal }
      )
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok')
          return res.json()
        })
        .then((data) => {
          setCountries(Array.isArray(data) ? data : [])
          setStatus('idle')
        })
        .catch((err) => {
          if (err.name === 'AbortError') return
          setCountries([])
          setStatus('error')
          console.error(err)
        })
    }, 500)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return { countries, status }
}