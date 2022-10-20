import React from 'react';
import { Header } from '../../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { SideNav } from '../../components/SideNav';
import Swal from 'sweetalert2';
import api from '../../axios/config';
import { ListItem } from '../../components/ListItem';
import { ListCont } from '../../components/ListCont';
import { CtxProps, logInfo } from '../../App';
import { BackButton } from '../../components/BackButton';
import { AnswerProps } from '../../types/answer';
import { getAnswersByQuestion } from '../../data/getAnswersByQuestion';
import axios, { AxiosError } from 'axios';

export function Answers(){

	const [answers, setAnswers] = React.useState<AnswerProps[]>([]);
	const navigator = useNavigate();
	const {logData} = React.useContext(logInfo) as CtxProps;
	const params = useParams();
	
	React.useEffect(() => {
		handleGetAnswersByQuestion();
		if(logData.email === undefined){
		
			navigator('/login');
		}
	}, []);

	async function handleGetAnswersByQuestion(){
		if(!params.id) return; 
		const data = await getAnswersByQuestion(params.id);
		if(typeof data === 'string') return toast(data); 
		if(typeof data.data === 'string') return;
		return setAnswers(data.data);
	}

	function handleAddAnswer(){
		if(!params.id) return;
		if(answers.length >= 4) return toast.error('You can`t have more than 4 answers for a question');
		navigator(`/answers/add/${params.id}`);
	}

	async function handleDelete(id: string){

		

		Swal.fire({
			title: 'Are you sure you want to delete this Answer?',
			showCancelButton: true,
			confirmButtonText: 'Delete'
		}).then(async (result) => {
			if(result.isConfirmed){
				try{
					const data = await api.delete<string>(`answers/${id}`);
					handleGetAnswersByQuestion();
					return toast.success(data.data);
				}catch(e){
					const errors = e as AxiosError | Error;
					if(!axios.isAxiosError(errors)){
						return errors.message;
					}
					if(!errors.response) return 'Something went wrong';
					return errors.response;
				}
			}
		});
	}

	function handleClickAnswer(id: string){
		navigator(`/answer/${id}`);
	}


	return (
		<>
			<Header />
			<SideNav />
			<BackButton />
			<div className='main-container'>
				<h1>{`Answers in Question ${params.id}`}</h1>
				<ListCont callbackAddButton={handleAddAnswer}>
					{answers.map(ans => <ListItem text={ans.text} isCorrect={ans.is_correct} id={ans.id} key={ans.id} callbackDel={handleDelete} callbackItem={handleClickAnswer}/> )}
				</ListCont>
			</div>
			<ToastContainer />
		</>
	);
}