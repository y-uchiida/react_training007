import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../app/hooks'

import {
	increment, decrement, incrementByAmount
} from '../features/customCounter/customCounterSlice'

const CustomCounterSampleComponent = () => {
	const [baseAmount, setBaseAmount] = useState(0);
	const count = useAppSelector(state => state.customCounter.value)
	const dispatch = useAppDispatch()
	return (
		<>
			<span data-testid="countValue">{count}</span>
			<div>
				<button onClick={() => { dispatch(increment()) }}>+</button>
				<button onClick={() => { dispatch(decrement()) }}>-</button>
			</div>
			<div>
				<input data-testid="amount" type="text" value={baseAmount} onChange={(e) => setBaseAmount(Number(e.target.value))} />
				<button onClick={() => { dispatch(incrementByAmount(baseAmount | 0)) }}>increment by amount</button>
			</div>
		</>
	)
}

export default CustomCounterSampleComponent
