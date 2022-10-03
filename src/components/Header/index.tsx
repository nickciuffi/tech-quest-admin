import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

export function Header(){
	return(
		<div id="background">
			<Link id="link-home" to={'/'}><h2 id="text-title">TECH QUEST</h2></Link>
		</div>
	);
}