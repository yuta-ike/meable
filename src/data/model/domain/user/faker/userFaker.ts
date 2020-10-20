import AppUser from "../appUser"

const generateAppUser = (userId: string | number = 1, schoolId: string | number = "A", classId: string | number = "a") =>
	new AppUser(`user${userId}`, `education.web.app${userId}@example.com`, `school${schoolId}`, `class${classId}`, `ユーザー${userId}`)

export default generateAppUser