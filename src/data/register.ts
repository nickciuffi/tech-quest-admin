import api from '../axios/config';
import axios, { AxiosError, AxiosResponse }from 'axios';


export const register = async (email: string, password: string, name: string): Promise<AxiosResponse<string> | string> =>{
	try{
		const data = await api.post<string>('users', {
			email: email,
			password: password,
			name: name
		});

		return data;
	}catch(e){
		const errors = e as AxiosError | Error;
		if(!axios.isAxiosError(errors)){
			return errors.message;
		}
		if(!errors.response) return 'something went wrong';
		return errors.response;

	}
};