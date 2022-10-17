import { AxiosResponse } from 'axios';
import api from '../axios/config';

export async function addQuestion(title: string, questionaryId: string): Promise<AxiosResponse<number[] | string> | string>{
	try{
		const data = await api.post<number[] | string>('/questions', {
			text: title,
			questionary_id: questionaryId
		});
		return data;
	}
	catch(e: any){
		if(!e.response) return 'Something went wrong';
		return e.response;		
	}
}