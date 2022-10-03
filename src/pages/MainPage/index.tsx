import React, {useEffect, useContext} from 'react';
import { CtxProps, logInfo } from '../../App';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';

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
		
			<form><div>Salv</div></form>
		</>
	);
}