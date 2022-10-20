import React, { ReactNode } from 'react';
import { AddButton } from '../AddButton';
import './styles.scss';

type ListContProps = {
    callbackAddButton: () => void;
    children: ReactNode
}

export function ListCont({callbackAddButton, children}: ListContProps){
	return (
		<div className='list-container'>
			<AddButton callback={callbackAddButton} />

			<div className='items-box'>
				{children}
			</div>
		</div>
	);
}