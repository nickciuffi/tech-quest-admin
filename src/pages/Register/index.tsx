import React from 'react';
import { Form } from 'react-bootstrap';
import { Header } from '../../components/Header';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { register } from '../../data/register';
import { ToastContainer, toast } from 'react-toastify';

export function Register(){
	
	async function handleRegister(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const name = form.querySelector('#input-name') as HTMLInputElement;
		const email = form.querySelector('#input-email') as HTMLInputElement;
		const password = form.querySelector('#input-password') as HTMLInputElement;
		const resultReg = await register(email.value, password.value, name.value);
		toast(resultReg);
	}
	
	return (
		<>
			<Header />
			<div className="container">
				<h1>Register</h1>
				<Form id="form" onSubmit={(e) => handleRegister(e)}>

					<Form.Group className="mb-3" controlId="input-name">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Enter name" />
						
					</Form.Group>

					<Form.Group className="mb-3" controlId="input-email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						
					</Form.Group>

					<Form.Group className="mb-3" controlId="input-password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					
					<Button className='mt-1' variant="primary" type="submit">
						Submit
					</Button>
					<Form.Group className="mt-3">
						<Form.Text>Already have an acount? <Link to={'/login'}>Log In</Link></Form.Text>
					</Form.Group>

				</Form>
			</div>
			<ToastContainer />
		</>
	);
}