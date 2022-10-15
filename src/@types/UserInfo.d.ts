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
