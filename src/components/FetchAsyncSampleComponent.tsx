import React, { useState } from 'react'

import { useAppSelector, useAppDispatch } from '../app/hooks'

import {
	fetchDummy,
	fetchJSON,
} from '../features/customCounter/customCounterSlice'


const FetchAsyncSampleComponent = () => {
	const count = useAppSelector(state => state.customCounter.value);
	const username = useAppSelector(state => state.customCounter.username);
	const dispatch = useAppDispatch();

	return (
		<>
			<div>
				<h2>async counter</h2>
				<span data-testid="countValue">{count}</span>
				<button onClick={async () => dispatch(await fetchDummy(5))}>fetchDummy</button>
			</div>

			<div>
				<h2>async API call</h2>
				{username ?
					<p data-testid="usernameValue">{username}</p>
					:
					<></>
				}
				<button
					disabled={username !== null}
					onClick={async () => dispatch(await fetchJSON())}>
					fetchJSON
				</button>
			</div>
		</>
	)
}

export default FetchAsyncSampleComponent
