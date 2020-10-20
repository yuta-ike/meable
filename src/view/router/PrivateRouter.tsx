import React, { ComponentProps } from "react"
import { Route, Redirect } from "react-router-dom";
import { useAppUser } from "src/Adapter/UserProvider";

const PrivateRouter: React.FC<ComponentProps<typeof Route>> = ({ ...props }) => {
	const appUser = useAppUser()
	if (appUser != null){
		return <Route {...props}/>
	}else{
		return <Redirect to="/login"/>
	}
}

export default PrivateRouter