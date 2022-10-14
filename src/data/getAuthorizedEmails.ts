import { AxiosResponse } from 'axios';
import api from '../axios/config';
import { AuthoProps } from '../types/authorizedEmails';

export async function getAllAuthorizedEmails(): Promise<AxiosResponse<AuthoProps[]> | string>{
	try{
		const data = await api.get<AuthoProps[]>('/autorized-emails'); 
		return data;
	}
	catch(e: any){
		if(!e.response) return 'Something went wrong';
		return e.response;
	}
}