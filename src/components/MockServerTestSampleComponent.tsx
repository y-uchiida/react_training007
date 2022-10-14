import React, { useState } from 'react';
import axios from 'axios';

/* jsonplaceholder.typicode.com/users */
interface UserInfo {
	id: number
	name: string
	username: string
	email: string
	address: {
		street: string | null
		suite: string | null
		city: string | null
		zipcode: string | null
		geo: {
			lat: number
			lng: number
		} | null
	}
	phone: string | null
	website: string | null
	company: {
		name: string | null
		catchPrase: string | null
		bs: string | null
	} | null
}

const MockServerTestSampleComponent = () => {
	const [clicked, setClicked] = useState(false);
	const [userName, setUserName] = useState('');
	const [error, setError] = useState('');

	const fetchUserInfo = async () => {
		axios.get<UserInfo>('https://jsonplaceholder.typicode.com/users/1').then(
			(res) => {
				const { username } = res.data;
				setUserName(username);
				setClicked(true);
			}
		).catch(() => {
			setError('fetch user info failed.');
		});

	};

	const buttonText = clicked ? 'Loaded' : 'start fetch';

	return (
		<div>
			<button onClick={fetchUserInfo} disabled={clicked}>
				{buttonText}
			</button>
			{userName && <p data-testid="username">{userName}</p>}
			{error && <p data-testid="errorMessage">{error}</p>}
		</div>
	)
}

export default MockServerTestSampleComponent
