import React from 'react'

interface item {
	id: number
	name: string
}

interface props {
	items: item[]
}

const ListSampleComponent = ({ items }: props) => {
	return (
		<>
			{items.length ? (
				<ul>
					{items.map(item => {
						return <li key={item.id}>{item.name}</li>
					})}
				</ul>
			) :
				<p data-testid="noItem">no items</p>
			}
		</>
	)
}

export default ListSampleComponent
