import { AxiosResponse } from 'axios';
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
		return 'something went wrong';		
	}
}