import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { AuthoProps } from '../../types/authorizedEmails';
import './styles.scss';
import Swal from 'sweetalert2';
import { AxiosResponse } from 'axios';
import api from '../../axios/config';
import { toast } from 'react-toastify';

type AuthoEmailProps = {
	email: string,
	id: number,
	getEmails: () => void
}


export function AuthoEmail({email, id, getEmails}: AuthoEmailProps){

	async function handleDelete(){
		Swal.fire({
			title: 'Are you sure you want to delete this email?',
			showCancelButton: true,
			confirmButtonText: 'Delete'
		}).then(async (result) => {
			if(result.isConfirmed){
				try{
					const data = await api.delete<string>(`autorized-emails/${id}`);
					getEmails();
					return toast.success(data.data);
				}catch(e: any){
					if(!e.response) return toast('Something went wrong');
					return toast.error(e.response);
				}
			}
		});
	}

	return (
		<div className='autho-email' id={`${id}`}>
			<p>{email}</p>
			<button onClick={handleDelete}><AiFillDelete size={25}/></button>
		</div>
	);
}