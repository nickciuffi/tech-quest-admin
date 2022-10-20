import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CtxProps, logInfo } from '../../App';
import {Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './styles.scss';
import {tryLogin} from '../../data/login';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export function LogIn(){

	const {logData, setLogData} = useContext(logInfo) as CtxProps;
	const navigate = useNavigate();

	React.useEffect(() => {
		if(!logData.email) return; 
		navigate('/');
	}, [logData]);

	async function handleLogin(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		
		const form = e.target as HTMLFormElement;
		const email = form.querySelector('#input-email') as HTMLInputElement;
		const password = form.querySelector('#input-password') as HTMLInputElement;	
		if(typeof email.value !== 'string' || typeof password.value !== 'string') return;
		if(!email.value) return toast.error('You have to send an email');
		if(!password.value) return toast.error('You have to send a password');
		const resultLogin = await tryLogin(email.value, password.value);
		if(typeof resultLogin === 'string') return toast.error(resultLogin);
		if(typeof resultLogin.data === 'string') return toast.error(resultLogin.data);
		if(resultLogin.status !== 200) return toast.error('Something went wrong');
		setLogData({
			email: resultLogin.data.email,
			name: resultLogin.data.name
		});
	}

	return(
		<>
			<Header />
			<div className='container'>
				<h1>Login</h1>
				<Form id="form" onSubmit={(e) => handleLogin(e)}>
					<Form.Group className="mb-3" controlId="input-email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						
					</Form.Group>

					<Form.Group className="mb-3" controlId="input-password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					
					<Button className='mt-1' variant="primary" type="submit">
						Log In
					</Button>
					<Form.Group className="mt-3">
						<Form.Text>Don`t have an acount? <Link to={'/register'}>Register</Link></Form.Text>
					</Form.Group>

				</Form>

			</div>
			<ToastContainer />
		</>

	);
}