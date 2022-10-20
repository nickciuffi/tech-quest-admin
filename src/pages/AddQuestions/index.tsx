import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Header } from '../../components/Header';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { SideNav } from '../../components/SideNav';
import { CtxProps, logInfo } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.scss';
import { addQuestion } from '../../data/addQuestion';
import { BackButton } from '../../components/BackButton';
export function AddQuestions(){

	const {logData} = useContext(logInfo) as CtxProps;
	const navigator = useNavigate();
	const params = useParams();

	React.useEffect(() => {
		if(logData.email === undefined){
		
			navigator('/login');
		}
	}, []);

	async function handleAddQuest(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		if(!params.id) return toast.error('You need a questionary id'); 

		const form = e.target as HTMLFormElement;
		const text = form.querySelector('#input-text') as HTMLInputElement;
		if(!text.value) return toast.error('You have to send a question'); 
		const data = await addQuestion(text.value, `${params.id}`);
		if(typeof data === 'string') return toast.error(data);
		if(typeof data.data === 'string') return toast.error(data.data);
		text.value = '';
		return toast.success('Question added');
	}

	return (
		<>
			<Header />
			<SideNav />
			<BackButton />
			<div className='container'>
				<h1 className='title'>Add Questions to Questionary {params.id}</h1>
				<Form id="form" onSubmit={(e) => handleAddQuest(e)}>
					<Form.Group className="mb-3" controlId="input-text">
						<Form.Label>Question</Form.Label>
						<Form.Control type="text" placeholder="Enter title" />
						
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