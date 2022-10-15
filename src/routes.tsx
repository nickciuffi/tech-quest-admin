import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AddAuthoEmails } from './pages/AddAuthoEmails';
import { AddQuestionaries } from './pages/AddQuestionaries';
import { AuthoEmails } from './pages/AuthoEmails';
import { ErrorPage } from './pages/ErrorPage';
import { LogIn } from './pages/Login';
import { MainPage } from './pages/MainPage';
import { Register } from './pages/Register';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
	},
	{
		path: '/questionaries/add',
		element: <AddQuestionaries />
	},
	{
		path: '/login',
		element: <LogIn />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/authorized-emails',
		element: <AuthoEmails />,
	},
	{
		path: '/authorized-emails/add',
		element: <AddAuthoEmails />
	},
	{
		path: '*',
		element: <ErrorPage />,
	}
]);