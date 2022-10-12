import api from '../axios/config';
import { AxiosError, AxiosResponse }from 'axios';

type RegisterProps = {
    email: string,
    name: string
 }

export const register = async (email: string, password: string, name: string): Promise<AxiosResponse<string> | string> =>{
	try{
		const data = await api.post<string>('users', {
			email: email,
			password: password,
			name: name
		});

		return data;
	}
	catch(e: any){
		console.log(e);
		return e.response;
	}
};