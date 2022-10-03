import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CtxProps, logInfo } from '../../App';
import {Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './styles.scss';

export function LogIn(){

	const {logData, setLogData} = useContext(logInfo) as CtxProps;
	const navigate = useNavigate();

	return(
		<>
			<Header />
			<div className='container'>
				<h1>Login</h1>
				<Form id="form" onSubmit={() => {
					setLogData({
						name: 'nicolas',
						email: 'nicolasciuffi'
					
					});
					navigate('/');
				}
				}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
						
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>
					
					<Button className='mt-1' variant="primary" type="submit">
						Submit
					</Button>
					<Form.Group className="mt-3">
						<Form.Text>Doesn`t have an acount? <Link to={'/register'}>Register</Link></Form.Text>
					</Form.Group>

				</Form>

			</div>
		</>

	);
}