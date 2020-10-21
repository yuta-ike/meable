import React, { ComponentProps } from "react"
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppUser } from "src/Adapter/UserProvider";
import usePrevious from "src/utils/usePrev";

const PrivateRouter: React.FC<ComponentProps<typeof Route>> = ({ ...props }) => {
	const location = useLocation()
	const appUser = useAppUser()
	const prevAppUser = usePrevious(appUser)
	
	const isAuthenticated = appUser != null
	const isRegistered = appUser?.schoolSecret !== "" ?? false
	if (isAuthenticated){
		if(isRegistered){
			return <Route {...props}/>
		}else{
			return <Redirect to="/register" />
		}
	} else if (prevAppUser != null){
		return <Redirect to="/logout" />
	} else {
		sessionStorage.setItem("redirect_uri", location.pathname)
		return <Redirect to={{ pathname: "/login", state: { from: location.pathname }}}/>
	}
}

export default PrivateRouter