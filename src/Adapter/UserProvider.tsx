import React, { useContext, useEffect, useState } from "react"
import { createContext } from "react"
import AppUser from "src/data/model/domain/user/appUser"
import UserUsecase from "src/usecase/userUsecase"
import { getUserUsecase } from "./initialize"

const userUsecaseInit = getUserUsecase()
const UserContex = createContext<UserUsecase>(userUsecaseInit)
const UserContextProvider = UserContex.Provider

const UserDataContex = createContext<AppUser | null>(userUsecaseInit.appUser)
const UserDataContextProvider = UserDataContex.Provider

const UserProvider: React.FC<{}> = ({ children }) => {
	const [userUsecase] = useState<UserUsecase>(userUsecaseInit)
	const [appUser, setAppUser] = useState<AppUser | null>(userUsecaseInit.appUser)

	useEffect(() => {
		userUsecase.subscribe((_appUser) => {
			setAppUser(_appUser)
		}, "taskprovider")
		// TODO: Unsubscribeの実装
		// return taskUsecase.unsubscribe("taskprovider")
	}, [userUsecase])

	return (
		<UserContextProvider value={userUsecase}>
			<UserDataContextProvider value={appUser}>
				{children}
			</UserDataContextProvider>
		</UserContextProvider>
	)
}

const useUserUsecase = () => useContext(UserContex)
const useAppUser = () => useContext(UserDataContex)

export default UserProvider
export { useUserUsecase, useAppUser }