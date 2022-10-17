import React from 'react';
import {useNavigate} from 'react-router-dom';
import './styles.scss';
import {BiArrowBack } from 'react-icons/bi';

export function BackButton(){

	const navigator = useNavigate();

	return (
		<button className='back-button' onClick={() => navigator(-1)}><BiArrowBack size={32} /></button>
	);
}