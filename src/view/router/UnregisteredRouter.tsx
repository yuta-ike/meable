import React, { ComponentProps } from "react"
import { Route, Redirect } from "react-router-dom";
import { useAppUser } from "src/Adapter/UserProvider";

const UnregisteredRouter: React.FC<ComponentProps<typeof Route>> = ({ ...props }) => {
	const appUser = useAppUser()

	const isAuthenticated = appUser != null
	const isRegistered = appUser?.schoolSecret !== "" ?? false
	console.log(appUser)

	if (isAuthenticated && !isRegistered) {
		return <Route {...props} />
	} else {
		return <Redirect to="/" />
	}
}

export default UnregisteredRouter