import React from 'react'

export default function CountryList({ countries, onShow }) {
	if (!countries || countries.length === 0) return null

	return (
		<ul>
			{countries.map((c) => {
				const name = c.name?.common || 'Unknown'
				return (
					<li key={name}>
						{name}{' '}
						<button type="button" onClick={() => onShow(name)}>Show</button>
					</li>
				)
			})}
		</ul>
	)
}