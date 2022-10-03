import React from 'react';
import { Form } from 'react-bootstrap';
import { Header } from '../../components/Header';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function Register(){
	return (
		<>
			<Header />
			<div className="container">
				<h1>Register</h1>
				<Form id="form" onSubmit={(e) => {
					e.preventDefault();
				}}>

					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Enter name" />
						
					</Form.Group>

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