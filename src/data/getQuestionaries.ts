import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';
import { QuestionaryProps } from '../types/questionary';

export async function getAllQuestionaries(): Promise<AxiosResponse<QuestionaryProps[]> | string>{
	try{
		const data = await api.get<QuestionaryProps[]>('/questionaries'); 
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