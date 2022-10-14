import React from 'react';
import Form from 'react-bootstrap/Form';
import { Header } from '../../components/Header';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { addAuthoEmail } from '../../data/addAuthoEmail';
import { SideNav } from '../../components/SideNav';

export function AddAuthoEmails(){

	async function handleAddAutho(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const email = form.querySelector('#input-email') as HTMLInputElement;
		if(!email.value) return toast.error('You have to send an email'); 
		const data = await addAuthoEmail(email.value);
		if(typeof data === 'string') return toast.error(data);
		if(typeof data.data === 'string') return toast.error(data.data);
		email.value = '';
		return toast.success('Email added');
	}

	return (
		<>
			<Header />
			<SideNav />
			<div className='container'>
				<h1>Add Authorized Emails</h1>
				<Form id="form" onSubmit={(e) => handleAddAutho(e)}>
					<Form.Group className="mb-3" controlId="input-email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						
					</Form.Group>

					<Button className='mt-1' variant="primary" type="submit">
						Add
					</Button>
					
				</Form>

			</div>
			<ToastContainer />
		</>
	);
}