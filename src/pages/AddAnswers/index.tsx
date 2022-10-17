import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Header } from '../../components/Header';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { SideNav } from '../../components/SideNav';
import { CtxProps, logInfo } from '../../App';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { addAnswer } from '../../data/addAnswer';

export function AddAnswers(){

	const {logData} = useContext(logInfo) as CtxProps;
	const navigator = useNavigate();
	const params = useParams();

	React.useEffect(() => {
		if(logData.email === undefined){
		
			navigator('/login');
		}
	}, []);

	async function handleAddAnswer(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		if(!params.id) return toast.error('You need a Question id'); 

		const form = e.target as HTMLFormElement;
		const text = form.querySelector('#input-text') as HTMLInputElement;
		const isCorrect = form.querySelector('#input-is-correct') as HTMLInputElement;
		if(!text.value) return toast.error('You have to send an answer'); 
        
		const data = await addAnswer(text.value, `${params.id}`, isCorrect.checked);
		if(typeof data === 'string') return toast.error(data);
		if(typeof data.data === 'string') return toast.error(data.data);
		text.value = '';
		return toast.success('Answer added');
	}

	return (
		<>
			<Header />
			<SideNav />
			<BackButton />
			<div className='container'>
				<h1 className='title'>Add Answers to Question {params.id}</h1>
				<Form id="form" onSubmit={(e) => handleAddAnswer(e)}>
					<Form.Group className="mb-3" controlId="input-text">
						<Form.Label>Answer</Form.Label>
						<Form.Control type="text" placeholder="Enter title" />
						
					</Form.Group>
					<Form.Group className="mb-3" controlId="input-is-correct">
						<Form.Check type="checkbox" label="Is Correct?" />
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