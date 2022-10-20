import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';

export async function addQuestionary(title: string, desc: string): Promise<AxiosResponse<number[] | string> | string>{
	try{
		const data = await api.post<number[] | string>('/questionaries', {
			title: title,
			desc: desc
		});
		return data;
	}
	catch(e){
		const errors = e as AxiosError | Error;
		if(!axios.isAxiosError(errors)){
			return errors.message;
		}
		if(!errors.response) return 'Something went wrong';
		if(errors.response.data.code === 'ER_DUP_ENTRY') return 'Duplicate title';
		return 'something went wrong';		
	}
}