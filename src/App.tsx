
import React, {useState, createContext} from 'react';
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';

export type LogInfoProps = {
	name?: string,
	email?: string,
}
export type CtxProps = {
	logData: LogInfoProps,
	setLogData: React.Dispatch<React.SetStateAction<LogInfoProps>>
}

export const logInfo = createContext<CtxProps | null>(null);

export default function App() {

	const [logData, setLogData] = useState<LogInfoProps>({});

	
	return (
		<logInfo.Provider value={{logData, setLogData}}>
			
			<RouterProvider router={router} />
			
		</logInfo.Provider>
	);
}
