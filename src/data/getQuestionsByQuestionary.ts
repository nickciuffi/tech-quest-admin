import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';
import { QuestionProps } from '../types/question';

export async function getQuestionsByQuestionary(id: string): Promise<AxiosResponse<QuestionProps[] | string> | string>{
	try{
		const data = await api.get<QuestionProps[]>(`/questions/questionary/${id}`); 
		return data;
	}catch(e){
		const errors = e as AxiosError | Error;
		if(!axios.isAxiosError(errors)){
			return errors.message;
		}
		if(!errors.response) return 'something went wrong';
		return errors.response;

	}
}