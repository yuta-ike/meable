import AppUser from "./appUser"

const toAppUser = (user: firebase.User | null, schoolId: string = "", classId: string = "") => {
	if(user == null) return null
	
	return new AppUser(
		user.uid,
		user.email ?? "",
		schoolId,
		classId,
		user.displayName ?? "みとうろく",
	)
}

export default toAppUser