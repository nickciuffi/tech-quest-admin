import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';
import { QuestionProps } from '../types/question';

export async function getQuestionInfo(id?: string): Promise<AxiosResponse<QuestionProps | string> | string>{
	if(!id) return 'Something went wrong'; 
	try{
		const data = await api.get<QuestionProps>(`/questions/${id}`); 
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