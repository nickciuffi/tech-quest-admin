import React, {useContext} from 'react';
import { CtxProps, logInfo } from '../../App';
import './styles.scss';
import {GiHamburgerMenu} from 'react-icons/gi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export function SideNav(){

	const {logData, setLogData} = useContext(logInfo) as CtxProps;
	const [isHiden, setIsHiden] = React.useState(true);
	const navigator = useNavigate();

	function handleLogOut(){
		setLogData({});
		navigator('/login');
	}

	return (
		<div className={`nav-container ${isHiden ? 'hiden' : ''}`}>
			<button className='off-on-btn' onClick={() => setIsHiden(!isHiden)}>
				<GiHamburgerMenu size={32} display={isHiden ? 'block' : 'none'}/>
				<AiOutlineArrowLeft size={32} display={isHiden ? 'none' : 'block'} />
			</button>
			<div>{logData.name}</div>
			<div><button className='link-autho' onClick={() => navigator('/authorized-emails')}>Authorized emails</button></div>
			<div><button className='log-out-btn' onClick={handleLogOut}>Log Out</button></div>
		</div>
	);
}