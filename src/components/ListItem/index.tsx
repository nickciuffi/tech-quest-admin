import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import './styles.scss';
import { BsFillExclamationCircleFill } from 'react-icons/bs';

type ListItemProps = {
    text: string,
    callbackDel: (id: string) => void,
    callbackItem: (id: string) => void,
    id: number,
	isCorrect?:boolean,
	isNotComplete?: boolean,
	notCompleteMsg?:string
}

export function ListItem({text, callbackDel, callbackItem, id, isCorrect, isNotComplete, notCompleteMsg}: ListItemProps){

	function handleMouseOverExclamation(e: React.MouseEvent){
		const image = e.target as HTMLElement;
		let p = image.parentElement as HTMLElement;
		
		while(p.tagName !== 'P'){
			p = p.parentElement as HTMLElement;
		}
		const span = p.querySelector('span') as HTMLElement;
		span.style.display = 'block';
		
	}
	function handleMouseLeaveExclamation(e: React.MouseEvent){
		
		const image = e.target as HTMLElement;
		let p = image.parentElement as HTMLElement;
		
		while(p.tagName !== 'P'){
			p = p.parentElement as HTMLElement;
		}
		const span = p.querySelector('span') as HTMLElement;
		span.style.display = 'none';
	}

	return (
		<div className={`list-item ${isCorrect !== undefined ? 
			( isCorrect ? 'correct' : 'incorrect')
			: ''}`} id={`${id}`}>
			<p onClick={() => callbackItem(`${id}`)} >{text}
				{isNotComplete && <div className='exclamation' 
					onMouseEnter={(e) => handleMouseOverExclamation(e)}
					onMouseLeave={(e) => handleMouseLeaveExclamation(e)}
					
				><BsFillExclamationCircleFill size={20} /></div>}
			
				<span className='message-incomplete'>{notCompleteMsg}</span>
			</p>
			<button onClick={() => callbackDel(`${id}`)}><AiFillDelete size={25}/></button>
		</div>
	);
}