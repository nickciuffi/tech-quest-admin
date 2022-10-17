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
import { QuestionProps } from '../../types/question';
import { getQuestionsByQuestionary } from '../../data/getQuestionsByQuestionary';
import { BackButton } from '../../components/BackButton';

export function Questions(){

	const [questions, setQuestions] = React.useState<QuestionProps[]>([]);
	const navigator = useNavigate();
	const {logData} = React.useContext(logInfo) as CtxProps;
	const params = useParams();
	
	React.useEffect(() => {
		handleGetQuestionsByQuestionary();
		if(logData.email === undefined){
		
			navigator('/login');
		}
	}, []);

	async function handleGetQuestionsByQuestionary(){
		if(!params.id) return; 
		const data = await getQuestionsByQuestionary(params.id);
		if(typeof data === 'string') return toast(data); 
		if(typeof data.data === 'string') return;
		return setQuestions(data.data);
	}

	function handleAddQuestion(){
		if(!params.id) return;
		navigator(`/questions/add/${params.id}`);
	}

	async function handleDelete(id: string){
		Swal.fire({
			title: 'Are you sure you want to delete this Question?',
			showCancelButton: true,
			confirmButtonText: 'Delete'
		}).then(async (result) => {
			if(result.isConfirmed){
				try{
					const data = await api.delete<string>(`questions/${id}`);
					handleGetQuestionsByQuestionary();
					return toast.success(data.data);
				}catch(e: any){
					if(!e.response) return toast('Something went wrong');
					return toast.error(e.response);
				}
			}
		});
	}

	function handleClickQuestion(id: string){
		navigator(`/question/${id}`);
	}


	return (
		<>
			<Header />
			<SideNav />
			<BackButton />
			<div className='main-container'>
				<h1>{`Questions in Questionary ${params.id}`}</h1>
				<ListCont callbackAddButton={handleAddQuestion}>
					{questions.map(quest => <ListItem text={quest.text} id={quest.id} key={quest.id} callbackDel={handleDelete} callbackItem={handleClickQuestion}/> )}
				</ListCont>
			</div>
			<ToastContainer />
		</>
	);
}