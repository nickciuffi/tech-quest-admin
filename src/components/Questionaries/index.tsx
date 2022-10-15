import React from 'react';
import { getAllQuestionaries } from '../../data/getQuestionaries';
import { QuestionaryProps } from '../../types/questionary';
import './styles.scss';
import {VscAdd} from 'react-icons/vsc';
import { AddButton } from '../AddButton';
import { toast } from 'react-toastify';
import { ListItem } from '../ListItem';
import { ListCont } from '../ListCont';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../axios/config';

export function Questionaries(){

	const [quests, setQuests] = React.useState<QuestionaryProps[]>([]);
	const navigator = useNavigate();

	React.useEffect(() => {
		handleGetQuestionaries();
	}, []);

	async function handleGetQuestionaries(){
		const data = await getAllQuestionaries();
		if(typeof data === 'string') return; 
		return setQuests(data.data);
	}

	function handleQuestClick(){
		console.log('Clicou');
	}
	function handleDelete(id: string){
		Swal.fire({
			title: 'Are you sure you want to delete this questionary?',
			showCancelButton: true,
			confirmButtonText: 'Delete'
		}).then(async (result) => {
			if(result.isConfirmed){
				try{
					const data = await api.delete<string>(`questionaries/${id}`);
					handleGetQuestionaries();
					return toast.success(data.data);
				}catch(e: any){
					if(!e.response) return toast('Something went wrong');
					return toast.error(e.response);
				}
			}
		});
	}

	function handleAddClick(){
		navigator('/questionaries/add');
	}

	return(
		<ListCont callbackAddButton={handleAddClick}>
			{quests.map(quest => <ListItem text={quest.title} id={quest.id} key={quest.id} callbackDel={handleDelete} callbackItem={handleQuestClick}/>)}
		</ListCont>
	);
}