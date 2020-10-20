import React, { ComponentProps } from "react"
import { Route, Redirect } from "react-router-dom";
import { useAppUser } from "src/Adapter/UserProvider";

const UnauthorizedRouter: React.FC<ComponentProps<typeof Route>> = ({ ...props }) => {
	const appUser = useAppUser()
	console.log(appUser)
	if (appUser != null){
		return <Redirect to="/"/>
	}else{
		return <Route {...props}/>
	}
}

export default UnauthorizedRouter