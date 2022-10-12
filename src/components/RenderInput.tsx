import React, { useState } from 'react'

interface props {
	outputConsole: Function
}

const RenderInput = ({ outputConsole }: props) => {
	const [input, setInput] = useState('');

	const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);
	}

	const outputValue = (e: React.MouseEvent) => {
		if (input) {
			outputConsole(input);
		}
	}
	return (
		<div>
			<input type="text" placeholder="Enter" value={input} onChange={updateValue} />
			<button onClick={outputValue}>Console.log</button>
		</div>
	)
}

export default RenderInput
