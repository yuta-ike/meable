import React, { useState } from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import PrivateRoute from './router/PrivateRouter'
import Home from './page/Home/Home'
import UnauthorizedRouter from './router/UnauthorizedRouter'
import Login from './page/Login/Login'
import Logout from './page/Logout/Logout'
import Register from './page/Register/Register'
import UnregisteredRouter from './router/UnregisteredRouter'
import Splash from './page/Splash/Splash'
import { useEffect } from 'react'
import { firebaseAuth } from 'src/firebase/initFirebaes'
import Scanner from './page/Scanner/Scanner'
import QRPage from './page/QRPage/QRPage'
import SchoolLogin from './page/SchoolLogin/SchoolLogin'
import SchoolHome from './page/SchoolHome/SchoolHome'

const Entry: React.FC = () => {
	const isSchool = window.location.hostname.indexOf("school.") > -1
	console.log(isSchool)
	// TODO: Repository層に依存してしまっている
	// xxUseCaseにinitializingフラグを追加して読む
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		firebaseAuth.getRedirectResult().then(() => {
			setIsLoading(false)
		})
	}, [])

	return (
		<>
			<Route path="/" children={isLoading && Splash} />
			{
				isSchool ? (
					<Switch>
						<Route exact path="/login" component={SchoolLogin} />
						<Route exact path="/" component={SchoolHome} />
						<Redirect to="/"/>
					</Switch>
				) : (
					<Switch>
						<UnauthorizedRouter exact path="/login" component={Login} />
						<UnauthorizedRouter exact path="/logout" component={Logout} />
						<UnregisteredRouter exact path="/register" component={Register} />
						<PrivateRoute exact path="/" component={Home} />
						<PrivateRoute exact path="/task/create" render={() => <Home showCreateDialog={true}/>} />
						<PrivateRoute exact path="/task/:taskId/gain" render={(props) => <Home showCompleteDialog={true} taskId={props.match.params.taskId}/>} />
						<PrivateRoute exact path="/task/:taskId/qr" component={QRPage} />
						<PrivateRoute exact path="/task/:taskId" render={(props) => <Home showTaskDialog={true} taskId={props.match.params.taskId}/>} />
						<PrivateRoute exact path="/history" component={() => <Home showHistoryDialog={true} />} />
						<PrivateRoute exact path="/scanner" component={Scanner}/>
						<Redirect to="/"/>
					</Switch>
				)
			}
		</>
	)
}

export default Entry