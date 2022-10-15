import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import './styles.scss';

type ListItemProps = {
    text: string,
    callbackDel: (id: string) => void,
    callbackItem: (id: string) => void,
    id: number,
}

export function ListItem({text, callbackDel, callbackItem, id}: ListItemProps){
	return (
		<div className='list-item' id={`${id}`}>
			<p onClick={() => callbackItem(`${id}`)} >{text}</p>
			<button onClick={() => callbackDel(`${id}`)}><AiFillDelete size={25}/></button>
		</div>
	);
}