import React from 'react';
import { Header } from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import './styles.scss';
import { AuthoProps } from '../../types/authorizedEmails';
import { getAllAuthorizedEmails } from '../../data/getAuthorizedEmails';
import { useNavigate } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { AddButton } from '../../components/AddButton';
import Swal from 'sweetalert2';
import api from '../../axios/config';
import { ListItem } from '../../components/ListItem';
import { ListCont } from '../../components/ListCont';

export function AuthoEmails(){

	const [authoEmails, setAuthoEmails] = React.useState<AuthoProps[]>([]);
	const navigator = useNavigate();

	function  hidratateEmails() {
		handleGetAuthoEmails();
	}

	React.useEffect(hidratateEmails, []);

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
				}catch(e: any){
					if(!e.response) return toast('Something went wrong');
					return toast.error(e.response);
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