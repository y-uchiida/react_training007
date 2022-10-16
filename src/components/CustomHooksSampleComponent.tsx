import React from 'react'
import { useCounter } from '../app/useCounter'

interface props {
	initialCount: number
}

const CustomHooksSampleComponent = ({ initialCount }: props) => {
	const {
		count,
		increment,
		decrement,
		double,
		triple,
		reset
	} = useCounter(initialCount)
	return (
		<div>
			<p>
				{count}
			</p>
			<div>
				<button onClick={increment} id="btn_increment">increment</button>
			</div>
			<div>
				<button onClick={decrement} id="btn_decrement">decrement</button>
			</div>
			<div>
				<button onClick={double} id="btn_double">double</button>
			</div>
			<div>
				<button onClick={double} id="btn_double">double</button>
			</div>
			<div>
				<button onClick={triple} id="btn_triple">triple</button>
			</div>
			<div>
				<button onClick={reset} id="btn_reset">reset</button>
			</div>
		</div>
	)
}

export default CustomHooksSampleComponent
