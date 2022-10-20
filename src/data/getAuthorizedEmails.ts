import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';
import { AuthoProps } from '../types/authorizedEmails';

export async function getAllAuthorizedEmails(): Promise<AxiosResponse<AuthoProps[]> | string>{
	try{
		const data = await api.get<AuthoProps[]>('/autorized-emails'); 
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
}