import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AddAnswers } from './pages/AddAnswers';
import { AddAuthoEmails } from './pages/AddAuthoEmails';
import { AddQuestionaries } from './pages/AddQuestionaries';
import { AddQuestions } from './pages/AddQuestions';
import { Answers } from './pages/Answers';
import { AuthoEmails } from './pages/AuthoEmails';
import { ErrorPage } from './pages/ErrorPage';
import { LogIn } from './pages/Login';
import { MainPage } from './pages/MainPage';
import { Question } from './pages/Question';
import { Questionary } from './pages/Questionary';
import { Questions } from './pages/Questions';
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
		path: '/questionary/:id',
		element: <Questionary />
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
		path: '/questions/:id',
		element: <Questions />	
	},
	{
		path: '/questions/add/:id',
		element: <AddQuestions />	
	},
	{
		path: '/question/:id',
		element: <Question />
	},
	{
		path: '/answers/:id',
		element: <Answers />
	},
	{
		path: '/answers/add/:id',
		element: <AddAnswers />
	},
	{
		path: '*',
		element: <ErrorPage />,
	}
]);