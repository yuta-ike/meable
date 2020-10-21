import React, { ComponentProps } from "react"
import { Route, Redirect } from "react-router-dom";
import { useAppUser } from "src/Adapter/UserProvider";
import { useLocation } from 'react-router-dom'

const UnauthorizedRouter: React.FC<ComponentProps<typeof Route>> = ({ ...props }) => {
	const location = useLocation<{from: string}>()
	const appUser = useAppUser()

	const isAuthenticated = appUser != null

	if (!isAuthenticated){
		return <Route {...props}/>
	}else{
		const redirect_uri = sessionStorage.getItem("redirect_uri")
		sessionStorage.removeItem("redirect_uri")
		return <Redirect to={location.state?.from ?? redirect_uri ?? "/"}/>
	}
}

export default UnauthorizedRouter