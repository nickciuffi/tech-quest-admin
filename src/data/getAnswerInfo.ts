import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';
import { AnswerProps } from '../types/answer';

export async function getAnswerInfo(id: string): Promise<AxiosResponse<AnswerProps | string> | string>{
	try{
		const data = await api.get<AnswerProps>(`/answers/${id}`); 
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