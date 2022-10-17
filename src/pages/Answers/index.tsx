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
				}catch(e: any){
					if(!e.response) return toast('Something went wrong');
					return toast.error(e.response);
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
				<h1>{`Questions in Questionary ${params.id}`}</h1>
				<ListCont callbackAddButton={handleAddAnswer}>
					{answers.map(ans => <ListItem text={ans.text} id={ans.id} key={ans.id} callbackDel={handleDelete} callbackItem={handleClickAnswer}/> )}
				</ListCont>
			</div>
			<ToastContainer />
		</>
	);
}