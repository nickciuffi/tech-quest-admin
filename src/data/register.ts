import api from '../axios/config';

type RegisterProps = {
    email: string,
    name: string
 }

export const register = async (email: string, password: string, name: string): Promise<string> =>{
	try{
		const data = await api.post('users', {
			email: email,
			password: password,
			name: name
		});

		return data.data as string;
	}
	catch(e){
		console.log(e);
		return 'Something went wrong';
	}
};