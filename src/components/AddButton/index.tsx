
import React from 'react';
import { VscAdd } from 'react-icons/vsc';
import './styles.scss';

type AddButtonProps = {
    callback: () => void
}

export function AddButton({callback}: AddButtonProps){
	return (
		<button onClick={callback} className='add-btn'><VscAdd size={32} /></button>
	);

}