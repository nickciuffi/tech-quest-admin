import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';

export async function addAnswer(title: string, questionId: string, isCorrect: boolean): Promise<AxiosResponse<number[] | string> | string>{
	try{
		const data = await api.post<number[] | string>('/answers', {
			text: title,
			is_correct: isCorrect,
			question_id: questionId
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
}