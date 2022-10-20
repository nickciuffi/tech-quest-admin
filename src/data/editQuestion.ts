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
	catch(e){
		const errors = e as AxiosError | Error;
		if(!axios.isAxiosError(errors)){
			return errors.message;
		}
		if(!errors.response) return 'something went wrong';
		
		return errors.response;
	}
}