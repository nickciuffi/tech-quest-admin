import { AxiosResponse } from 'axios';
import api from '../axios/config';
import { QuestionaryProps } from '../types/questionary';

export async function getAllQuestionaries(): Promise<AxiosResponse<QuestionaryProps[]> | string>{
	try{
		const data = await api.get<QuestionaryProps[]>('/questionaries'); 
		return data;
	}
	catch(e: any){
		if(!e.response) return 'Something went wrong';
		return e.response;
	}
}