import React from 'react';
import { Header } from '../../components/Header';
import './styles.scss';

export function ErrorPage(){
	return (
		<>
			<Header />
			<div className="container">
				<h1 className='title-error'>Page not found</h1>
			</div>
		</>
	);
}