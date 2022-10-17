import React from 'react';
import {useNavigate} from 'react-router-dom';
import './styles.scss';

export function BackButton(){

	const navigator = useNavigate();

	return (
		<button className='back-button' onClick={() => navigator(-1)}>Back</button>
	);
}