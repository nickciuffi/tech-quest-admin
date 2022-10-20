import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';

export async function addAuthoEmail(email: string): Promise<AxiosResponse<number[] | string> | string>{
	try{
		const data = await api.post<number[] | string>('/autorized-emails', {
			email: email
		});
		return data;
	}
	catch(err){

		const errors = err as AxiosError | Error;
		if(!axios.isAxiosError(errors)){
			return errors.message;
		}
		if(!errors.response) return 'something went wrong';
		return errors.response;
	}
    
}