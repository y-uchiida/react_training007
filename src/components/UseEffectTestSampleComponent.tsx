import React, { useEffect, useState } from 'react';
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


const UseEffectTestSampleComponent = () => {
	const [user, setUser] = useState<UserInfo | null>(null);

	const fetchUserInfo = async () => {
		const res = await axios.get<UserInfo>('https://jsonplaceholder.typicode.com/users/1');
		console.log("done", res);
		return res.data;
	};

	/* コンポーネントの初回マウント時の処理を、useEffect を用いて記述 */
	useEffect(() => {
		const unSub = async () => {
			const userInfo = await fetchUserInfo();
			setUser(userInfo);
		};
		unSub();
	}, []);

	return (
		<div>
			{user ? <p data-testid="userGreet">hello, {user.name}</p> : <></>}
		</div>
	)
}

export default UseEffectTestSampleComponent
