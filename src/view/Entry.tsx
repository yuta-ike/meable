import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import TaskProvider from 'src/Adapter/TaskProvider'
import PrivateRoute from './router/PrivateRouter'
import Home from './page/Home/Home'
import TaskComplete from './page/TaskComplete/TaskComplete'
import TaskCreate from './page/TaskCreate/TaskCreate'
import UnauthorizedRouter from './router/UnauthorizedRouter'
import Login from './page/Login/Login'
import UserProvider from 'src/Adapter/UserProvider'
import Logout from './page/Logout/Logout'
import Register from './page/Register/Register'
import UnregisteredRouter from './router/UnregisteredRouter'
import Splash from './page/Splash/Splash'
import { useEffect } from 'react'
import { firebaseAuth } from 'src/firebase/initFirebaes'
import Scanner from './page/Scanner/Scanner'

const Entry: React.FC = () => {
	// TODO: Repository層に依存してしまっている
	// xxUseCaseにinitializingフラグを追加して読む
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		firebaseAuth.getRedirectResult().then(() => {
			setIsLoading(false)
		})
	}, [])

	return (
		<Router>
			<TaskProvider>
				<UserProvider>
					<Route exact path="/login" children={isLoading && Splash} />
					<Switch>
						<UnauthorizedRouter exact path="/login" component={Login} />
						<UnauthorizedRouter exact path="/logout" component={Logout} />
						<UnregisteredRouter exact path="/register" component={Register} />
						<PrivateRoute exact path="/" component={Home} />
						<PrivateRoute exact path="/task/create" component={TaskCreate} />
						<PrivateRoute exact path="/task/:taskId" component={TaskComplete} />
						<PrivateRoute exact path="/scanner" component={Scanner}/>
					</Switch>
				</UserProvider>
			</TaskProvider>
		</Router>
	)
}

export default Entry