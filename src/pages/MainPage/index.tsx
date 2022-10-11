import React, {useEffect, useContext} from 'react';
import { CtxProps, logInfo } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { SideNav } from '../../components/SideNav';
import './styles.scss';

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
			<div className='main-container'><form><div>Salv {logData.name}</div></form></div>
			
		</>
	);
}