import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CtxProps, logInfo } from '../../App';
import { BackButton } from '../../components/BackButton';
import {Header} from '../../components/Header';
import { SideNav } from '../../components/SideNav';
import { editQuestionary } from '../../data/editQuestionary';
import { getQuestionaryInfo } from '../../data/getQuestionaryInfo';
import './styles.scss';

export function Questionary(){

	const {logData} = useContext(logInfo) as CtxProps;
	const [title, setTitle] = useState('titulo');
	const [desc, setDesc] = useState('desc');
	const navigator = useNavigate();
	const params = useParams();

	useEffect(() => {
		if(logData.email === undefined){
		
			navigator('/login');
		}
		handleGetQuestData();
	}, []);

	async function handleGetQuestData(){
		const data = await getQuestionaryInfo((params.id));
		if(typeof data === 'string') return toast(data);
		if(typeof data.data === 'string') return toast(data.data);
		if(!data.data[0].title || ! data.data[0].description) return toast('Something went wrong');
		setTitle(data.data[0].title);
		setDesc(data.data[0].description);
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		if(!title) return toast.error('You have to send a title');
		if(!desc) return toast.error('You have to send a description');
		if(desc.length > 150) return toast.error('The max length of the description is 150 characters');
		try{
			const data = await editQuestionary({title: title, id: Number(params.id), description: desc});
			if( typeof data === 'string') return toast.error(data);
			if(typeof data.data === 'string') return toast.error(data.data);
			if(data.data === 0) return toast.error('Something went wrong');
			return toast.success('Questionary edited');
		}
		catch(e: any){
			if(e.response.data.code === 'ER_DUP_ENTRY') return toast.error('Duplicate title');
		}
		
	}

	

	return (
		<>
			<Header />
			<SideNav />
			<BackButton />
			<div className='main-container'>
				<h1 className='title'>Edit Questionary</h1>
				<form className='edit-form' onSubmit={e => handleSubmit(e)}>
					<div className='edit-part'>
						<span>Title:</span>
						<input type={'text'} value={title} onChange={e => setTitle(e.target.value)} />
					</div>
					<div className='edit-part'>
						<span>desc:</span>
						<textarea maxLength={140} value={desc} onChange={e => setDesc(e.target.value)}></textarea>
					</div>
					<button type='submit'>Editar</button>

				</form>
				<button className='edit-next-btn' onClick={() => navigator(`/questions/${params.id}`)}>Edit Questions</button>
			</div>
			<ToastContainer />
		</>
	);

}