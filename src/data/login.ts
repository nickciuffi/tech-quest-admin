import api from '../axios/config';
import axios, {AxiosError, AxiosResponse} from 'axios';

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
		const errors = e as AxiosError | Error;
		if(!axios.isAxiosError(errors)){
			return errors.message;
		}
		if(!errors.response) return 'Something went wrong';
		return errors.response;
	}
};