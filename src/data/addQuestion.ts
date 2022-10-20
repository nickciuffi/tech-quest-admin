import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';

export async function addQuestion(title: string, questionaryId: string): Promise<AxiosResponse<number[] | string> | string>{
	try{
		const data = await api.post<number[] | string>('/questions', {
			text: title,
			questionary_id: questionaryId
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