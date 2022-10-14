import React, {useEffect, useContext} from 'react';
import { CtxProps, logInfo } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { SideNav } from '../../components/SideNav';
import './styles.scss';
import { Questionaries } from '../../components/Questionaries';

export function MainPage(){

	const {logData} = useContext(logInfo) as CtxProps;
	const navigate = useNavigate();

	useEffect(() => {
		
		if(logData.email === undefined){
			
			navigate('/login');
		}
	}, []);

	return (
		<>
			<Header />
			<SideNav />
			<div className='main-container'>
				<h1 className='title'>Questionaries</h1>
				<Questionaries />
			</div>
			
		</>
	);
}