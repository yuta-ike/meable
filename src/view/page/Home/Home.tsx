import React from 'react'
import { useTasks } from 'src/Adapter/TaskProvider'
import { useAppUser, useUserUsecase } from 'src/Adapter/UserProvider'
import useRouting from 'src/view/router/useRouting'

const Home: React.FC<{}> = () => {
	const tasks = useTasks()
	const moveTo = useRouting()
	const userUsecase = useUserUsecase()
	const appUser = useAppUser()

	const handleLogout = async () => {
		await userUsecase.logout()
	}

	return (
		<div>
			<button onClick={moveTo("/task/create")}>タスクを追加する</button>
			{
				tasks.map((task) => (
					<div key={task.id}>
						{task.title}: {task.body} （ポイント: {task.point}）
						<button onClick={moveTo(`/task/${task.id}`)}>ポイントを獲得する</button>
					</div>
				))
			}
			<div>プロフィール</div>
			userName: {appUser?.userName} <br/>
			schoolId: {appUser?.schoolId} <br />
			classId:  {appUser?.classId} <br />
			<button onClick={moveTo("/scanner")}>スキャンする</button>
			<button onClick={handleLogout}>ログアウトする</button>
		</div>
	)
}

export default Home
