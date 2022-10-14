import React from 'react';
import { getAllQuestionaries } from '../../data/getQuestionaries';
import { QuestionaryProps } from '../../types/questionary';
import { Questionary } from '../Questionary';
import './styles.scss';
import {VscAdd} from 'react-icons/vsc';
import { AddButton } from '../AddButton';
import { toast } from 'react-toastify';

export function Questionaries(){

	const [quests, setQuests] = React.useState<QuestionaryProps[]>([]);

	React.useEffect(() => {
		handleGetQuestionaries();
	}, []);

	async function handleGetQuestionaries(){
		const data = await getAllQuestionaries();
		if(typeof data === 'string') return; 
		return setQuests(data.data);
	}

	return(
		<div className='quests-container'>
			<AddButton callback={() => {toast('add');}} />

			<div className='questionaries-box'>
				{quests.map(quest => <Questionary title={quest.title} id={quest.id} key={quest.id}/>)}
			</div>
		</div>
	);
}