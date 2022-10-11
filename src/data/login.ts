import api from '../axios/config';

type LoginProps = {
    email: string,
    name: string
 }

export const tryLogin = async (email: string, password: string): Promise<LoginProps | string> =>{
	try{
		const data = await api.post('users/login', {
			email: email,
			password: password
		});

		return data.data as LoginProps | string;
	}
	catch(e){
		console.log(e);
		return 'Incorrect Values';
	}
};