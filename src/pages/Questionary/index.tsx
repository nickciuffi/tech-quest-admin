import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CtxProps, logInfo } from '../../App';
import {Header} from '../../components/Header';
import { SideNav } from '../../components/SideNav';

export function Questionary(){

	const {logData} = useContext(logInfo) as CtxProps;
	const navigator = useNavigate();

	useEffect(() => {
		if(logData.email === undefined){
		
			navigator('/login');
		}
	}, []);

	const params = useParams();

	return (
		<>
			<Header />
			<SideNav />
			<div className='main-container'>
				<div>{params.id}</div>
			</div>
		</>
	);

}