import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';

export async function editQuestion(text: string, id: string): Promise<AxiosResponse<number> | string>{
	
	try{
		if(!text || !id) return 'you didn`t send all the data';
		const data = api.put(`questions/${id}`, {
			text: text, 
			
		});
		return data;
	}
	catch(e: any){
		if(!e.response) return 'something went wrong';
		
		return e.response;
	}
}