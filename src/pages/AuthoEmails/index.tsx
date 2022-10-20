import React from 'react';
import { Header } from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { AuthoProps } from '../../types/authorizedEmails';
import { getAllAuthorizedEmails } from '../../data/getAuthorizedEmails';
import { useNavigate } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import Swal from 'sweetalert2';
import api from '../../axios/config';
import { ListItem } from '../../components/ListItem';
import { ListCont } from '../../components/ListCont';
import { CtxProps, logInfo } from '../../App';
import { BackButton } from '../../components/BackButton';
import axios, { AxiosError } from 'axios';

export function AuthoEmails(){

	const [authoEmails, setAuthoEmails] = React.useState<AuthoProps[]>([]);
	const navigator = useNavigate();
	const {logData} = React.useContext(logInfo) as CtxProps;
	
	React.useEffect(() => {
		handleGetAuthoEmails();
		if(logData.email === undefined){
		
			navigator('/login');
		}
	}, []);

	async function handleGetAuthoEmails(){
		const data = await getAllAuthorizedEmails();
		if(typeof data === 'string') return; 
		return setAuthoEmails(data.data);
	}

	function handleAddEmail(){
		navigator('/authorized-emails/add');
	}

	async function handleDelete(id: string){
		Swal.fire({
			title: 'Are you sure you want to delete this email?',
			showCancelButton: true,
			confirmButtonText: 'Delete'
		}).then(async (result) => {
			if(result.isConfirmed){
				try{
					const data = await api.delete<string>(`autorized-emails/${id}`);
					handleGetAuthoEmails();
					return toast.success(data.data);
				}catch(e){
					const errors = e as AxiosError | Error;
					if(!axios.isAxiosError(errors)){
						return errors.message;
					}
					
					if(!errors.response) return toast('Something went wrong');
					return toast.error(errors.response.data);
				}
			}
		});
	}

	function handleClickEmail(id: string){
		console.log(`clicou ${id}`);
	}


	return (
		<>
			<Header />
			<SideNav />
			<BackButton />
			<div className='main-container'>
				<h1>Authorized Emails</h1>
				<ListCont callbackAddButton={handleAddEmail}>
					{authoEmails.map(email => <ListItem text={email.email} id={email.id} key={email.id} callbackDel={handleDelete} callbackItem={handleClickEmail}/> )}
				</ListCont>
			</div>
			<ToastContainer />
		</>
	);
}