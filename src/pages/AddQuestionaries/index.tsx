import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Header } from '../../components/Header';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { SideNav } from '../../components/SideNav';
import { addQuestionary } from '../../data/addQuestionary';
import { CtxProps, logInfo } from '../../App';
import { useNavigate } from 'react-router-dom';

export function AddQuestionaries(){

	const {logData} = useContext(logInfo) as CtxProps;
	const navigator = useNavigate();

	React.useEffect(() => {
		if(logData.email === undefined){
		
			navigator('/login');
		}
	}, []);

	async function handleAddQuest(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const title = form.querySelector('#input-title') as HTMLInputElement;
		const desc = form.querySelector('#input-desc') as HTMLInputElement;
		if(!title.value) return toast.error('You have to send a title'); 
		if(!desc.value) return toast.error('You have to send a description'); 
		const data = await addQuestionary(title.value, desc.value);
		if(typeof data === 'string') return toast.error(data);
		if(typeof data.data === 'string') return toast.error(data.data);
		title.value = '';
		desc.value = '';
		return toast.success('Questionary added');
	}

	return (
		<>
			<Header />
			<SideNav />
			<div className='container'>
				<h1>Add Questionaries</h1>
				<Form id="form" onSubmit={(e) => handleAddQuest(e)}>
					<Form.Group className="mb-3" controlId="input-title">
						<Form.Label>Title</Form.Label>
						<Form.Control type="text" placeholder="Enter title" />
						
					</Form.Group>
					<Form.Group className="mb-3" controlId="input-desc">
						<Form.Label>Description</Form.Label>
						<Form.Control type="text" placeholder="Enter Description" />
						
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