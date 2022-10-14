import React from 'react';
import { QuestionaryProps } from '../../types/questionary';
import { AiFillDelete } from 'react-icons/ai';
import './styles.scss';

export function Questionary({title, id}: QuestionaryProps){
	return (
		<div className='quest-item' id={`${id}`}>
			<p>{title}</p>
			<button><AiFillDelete size={25}/></button>
		</div>
	);   
}