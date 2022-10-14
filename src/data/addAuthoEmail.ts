import { AxiosResponse } from 'axios';
import api from '../axios/config';
import { AuthoProps } from '../types/authorizedEmails';

export async function addAuthoEmail(email: string): Promise<AxiosResponse<number[] | string> | string>{
	try{
		const data = await api.post<number[] | string>('/autorized-emails', {
			email: email
		});
		return data;
	}
	catch(e: any){
		if(!e.response) return 'something went wrong';
		return e.response;
	}
    
}