import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
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
		path: '/login',
		element: <LogIn />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '*',
		element: <ErrorPage />,
	}
]);