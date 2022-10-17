import { AxiosResponse } from 'axios';
import api from '../axios/config';
import { QuestionProps } from '../types/question';

export async function getQuestionsByQuestionary(id: string): Promise<AxiosResponse<QuestionProps[] | string> | string>{
	try{
		const data = await api.get<QuestionProps[]>(`/questions/questionary/${id}`); 
		return data;
	}
	catch(e: any){
		if(!e.response) return 'Something went wrong';
		return e.response;
	}
}