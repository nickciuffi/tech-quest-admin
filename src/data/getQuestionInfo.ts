import { AxiosResponse } from 'axios';
import api from '../axios/config';
import { QuestionProps } from '../types/question';
import { QuestionaryProps } from '../types/questionary';

export async function getQuestionInfo(id?: string): Promise<AxiosResponse<QuestionProps | string> | string>{
	if(!id) return 'Something went wrong'; 
	try{
		const data = await api.get<QuestionProps>(`/questions/${id}`); 
		return data;
	}
	catch(e: any){
		if(!e.response) return 'Something went wrong';
		return e.response;
	}

}