import React, {useEffect, useContext, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CtxProps, logInfo } from '../../App';
import { BackButton } from '../../components/BackButton';
import { Header } from '../../components/Header';
import { SideNav } from '../../components/SideNav';
import { editQuestion } from '../../data/editQuestion';
import { getQuestionInfo } from '../../data/getQuestionInfo';

export function Question(){

	const {logData} = useContext(logInfo) as CtxProps;
	const [text, setText] = useState('');
	const navigator = useNavigate();
	const params = useParams();

	useEffect(() => {
		if(logData.email === undefined){
		
			navigator('/login');
		}
		handleGetQuestData();
	}, []);

	async function handleGetQuestData(){
		if(!params.id) return; 
		const data = await getQuestionInfo(params.id);
		if(typeof data === 'string') return toast(data);
		if(typeof data.data === 'string') return toast(data.data);
		if(!data.data.text) return toast('Something went wrong');
		setText(data.data.text);
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		if(!text) return toast.error('You have to send a question');
		
		const data = await editQuestion(text, `${params.id}`);
		if( typeof data === 'string') return toast.error(data);
		if(typeof data.data === 'string') return toast.error(data.data);
		if(data.data === 0) return toast.error('Something went wrong');
		return toast.success('Question edited');
		
	}
	return (
		<>
			<Header />
			<SideNav />
			<BackButton />
			<div className='main-container'>
				<h1 className='title'>Edit Question</h1>
				<form className='edit-form' onSubmit={e => handleSubmit(e)}>
					<div className='edit-part'>
						<span>Question:</span>
						<input type={'text'} value={text} onChange={e => setText(e.target.value)} />
					</div>
					<button type='submit'>Editar</button>

				</form>
				<button className='edit-next-btn' onClick={() => navigator(`/answers/${params.id}`)}>Answers</button>
			</div>
			<ToastContainer />
		</>
	);
}