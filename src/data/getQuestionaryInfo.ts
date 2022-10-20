import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';
import { QuestionaryProps } from '../types/questionary';

export async function getQuestionaryInfo(id?: string): Promise<AxiosResponse<QuestionaryProps[] | string> | string>{
	if(!id) return 'Something went wrong'; 
	try{
		const data = await api.get<QuestionaryProps[]>(`/questionaries/${id}`); 
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