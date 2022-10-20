import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';
import { QuestionaryProps } from '../types/questionary';

export async function editQuestionary({title, id, description}:QuestionaryProps): Promise<AxiosResponse<number> | string>{
	
	try{
		if(!title || !id || !description) return 'you didn`t send all the data';
		const data = api.put(`questionaries/${id}`, {
			title: title, 
			description: description
		});
		return data;
	}
	catch(e){
		const errors = e as AxiosError | Error;
		if(!axios.isAxiosError(errors)){
			return errors.message;
		}
		if(!errors.response) return 'something went wrong';
		if(errors.response.data.code === 'ER_DUP_ENTRY') return 'Duplicate title';
		return errors.response;
	}
}