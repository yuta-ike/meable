import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import TaskProvider from './Adapter/TaskProvider';
import UserProvider from './Adapter/UserProvider';
import './App.scss';
import Entry from './view/Entry';

const App: React.FC = () => (
	<Router>
		<TaskProvider>
			<UserProvider>
				<Entry/>
			</UserProvider>
		</TaskProvider>
	</Router>
)
export default App;
