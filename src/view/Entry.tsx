import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import TaskProvider from 'src/Adapter/TaskProvider'
import PrivateRoute from './router/PrivateRouter'
import Home from './page/Home/Home'
import TaskComplete from './page/TaskComplete/TaskComplete'
import TaskCreate from './page/TaskCreate/TaskCreate'
import UnauthorizedRouter from './router/UnauthorizedRouter'
import Login from './page/Login/Login'
import UserProvider from 'src/Adapter/UserProvider'

const Entry: React.FC = () => {
	return (
		<Router>
			<TaskProvider>
				<UserProvider>
					<Switch>
						<UnauthorizedRouter exact path="/login" component={Login} />
						<UnauthorizedRouter exact path="/logout" component={Home} />
						<PrivateRoute exact path="/" component={Home} />
						<PrivateRoute exact path="/task/create" component={TaskCreate} />
						<PrivateRoute exact path="/task/:taskId" component={TaskComplete} />
						<PrivateRoute exact path="/qr" component={TaskComplete}/>
					</Switch>
				</UserProvider>
			</TaskProvider>
		</Router>
	)
}

export default Entry