import { AxiosResponse } from 'axios';
import api from '../axios/config';
import { AnswerProps } from '../types/answer';

export async function getAnswerInfo(id: string): Promise<AxiosResponse<AnswerProps | string> | string>{
	try{
		const data = await api.get<AnswerProps>(`/answers/${id}`); 
		return data;
	}
	catch(e: any){
		if(!e.response) return 'Something went wrong';
		return e.response;
	}
}