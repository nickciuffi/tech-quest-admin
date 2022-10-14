import React from 'react';
import { Header } from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import { AuthoEmail } from '../../components/AuthoEmail';
import './styles.scss';
import { VscAdd } from 'react-icons/vsc';
import { AuthoProps } from '../../types/authorizedEmails';
import { getAllAuthorizedEmails } from '../../data/getAuthorizedEmails';
import { useNavigate } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import { AddButton } from '../../components/AddButton';

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


	return (
		<>
			<Header />
			<SideNav />
			<div className='main-container'>
				<div className='autho-container'>
					<h1>Authorized Emails</h1>
					<AddButton callback={handleAddEmail} />
					<div className='autho-emails-box'>
						{authoEmails.map(email => <AuthoEmail getEmails={hidratateEmails} email={email.email} id={email.id} key={email.id}/> )}
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
}