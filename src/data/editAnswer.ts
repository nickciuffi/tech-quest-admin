import axios, { AxiosError, AxiosResponse } from 'axios';
import api from '../axios/config';

type EditAnsProps = {
	id: number, 
	text: string,
	isCorrect: boolean,
	QId: number,
}

export async function editAnswer({id, text, isCorrect, QId}: EditAnsProps): Promise<AxiosResponse<number> | string>{
	
	try{
		if(typeof isCorrect !== 'boolean' || !text || !id) return 'you didn`t send all the data';
		const data = api.put(`answers/${id}`, {
			text: text, 
			is_correct: isCorrect,
			question_id: QId,
			id: id
		});
		return data;
	}
	catch(e: any){
		if(!e.response) return 'something went wrong';
		
		return e.response;
	}
}