import api from '../axios/config';
import {AxiosResponse} from 'axios';

type LoginProps = {
    email: string,
    name: string
 }

export const tryLogin = async (email: string, password: string): Promise<AxiosResponse<LoginProps | string> | string> =>{
	try{
		const data = await api.post<LoginProps | string>('users/login', {
			email: email,
			password: password
		});

		return data;
	}
	catch(e){
		console.log(e);
		return 'Something went wrong';
	}
};