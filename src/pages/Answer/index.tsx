import React, {useEffect, useContext, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { CtxProps, logInfo } from '../../App';
import { BackButton } from '../../components/BackButton';
import { Header } from '../../components/Header';
import { SideNav } from '../../components/SideNav';
import { editAnswer } from '../../data/editAnswer';
import { editQuestion } from '../../data/editQuestion';
import { getAnswerInfo } from '../../data/getAnswerInfo';
import { getQuestionInfo } from '../../data/getQuestionInfo';
import './styles.scss';

export function Answer(){

	const {logData} = useContext(logInfo) as CtxProps;
	const [text, setText] = useState('');
	const [isCorrect, setIsCorrect] = useState(false);
	const navigator = useNavigate();
	const params = useParams();

	useEffect(() => {
		if(logData.email === undefined){
		
			navigator('/login');
		}
		handleGetAnsData();
	}, []);

	async function handleGetAnsData(){
		if(!params.id) return; 
		const data = await getAnswerInfo(params.id);
		if(typeof data === 'string') return toast(data);
		if(typeof data.data === 'string') return toast(data.data);
		if(!data.data.text) return toast('Something went wrong');
		setText(data.data.text);
		setIsCorrect(data.data.is_correct);
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
		e.preventDefault();
		if(!text) return toast.error('You have to send an answer');

		const ansInfo = await getAnswerInfo(`${params.id}`);
		if(typeof ansInfo === 'string') return toast(ansInfo);
		if(typeof ansInfo.data === 'string') return toast(ansInfo.data);
		if(!ansInfo.data.question_id) return toast('Something went wrong');
				
		const data = await editAnswer({
			id: Number(params.id),
			text, 
			isCorrect,
			QId: ansInfo.data.question_id
		});
		if( typeof data === 'string') return toast.error(data);
		if(typeof data.data === 'string') return toast.error(data.data);
		if(data.data === 0) return toast.error('Something went wrong');
		return toast.success('Answer edited');
		
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
					<div className='edit-part check'>
						<span>Is Correct:</span>
						<input className='input-check' type={'checkbox'} checked={isCorrect} onChange={e => setIsCorrect(e.target.checked)} />
					</div>
					<button type='submit'>Editar</button>

				</form>
				
			</div>
			<ToastContainer />
		</>
	);
}