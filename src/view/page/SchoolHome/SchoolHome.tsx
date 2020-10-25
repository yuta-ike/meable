import React, { useEffect, useState } from 'react'
import PointLog from 'src/data/model/domain/task/pointLog';
import Task from 'src/data/model/domain/task/task';
import AppUser from 'src/data/model/domain/user/appUser';
import { firestore } from "src/firebase/initFirebaes";
import { PieChart, Pie, Legend, Tooltip } from 'recharts';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
	ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const data = [
	{ x: 100, y: 200, z: 200 },
	{ x: 120, y: 100, z: 260 },
	{ x: 170, y: 300, z: 400 },
	{ x: 140, y: 250, z: 280 },
	{ x: 150, y: 400, z: 500 },
	{ x: 110, y: 280, z: 200 },
];
const schoolId = "ABCD"

type TaskLog = { appUser: AppUser } & Omit<Task, "point" | "gainPoint" | "toJson">

type GainLog = {
	appUser: AppUser,
	task: Task[],
	pointLog: PointLog,
}

export default function SchoolHome() {
	const [tasks, setTasks] = useState<TaskLog[]>([])
	const [points, setPoints] = useState<GainLog[]>([])

	const [page, setPage] = useState(0)


	useEffect(() => {
		const init = async () => {
			const snapshots = await firestore.collection("Schools").doc(schoolId).collection("Students").get()
			snapshots.docs.forEach((snapshot) => {
				const appUser = AppUser.fromJson(snapshot.data())
				snapshot.ref.collection("Tasks").onSnapshot((data) => {
					const tasks = data.docs.map(snapshot => ({ ...Task.fromJson(snapshot.id, snapshot.data()), appUser }))
					setTasks(prev => {
						const _tasks = ([...prev, ...tasks])
						_tasks.sort((a, b) => {
							if (a.updatedAt == null || b.updatedAt == null) {
								return 0
							} else {
								return a.updatedAt > b.updatedAt ? 1 : a.updatedAt < b.updatedAt ? -1 : 0
							}
						})
						return _tasks.reverse()
					})
				})
			})
		}
		init()
	}, [])

	const [data, setData] = useState<{value: string, name: string}[]>([])

	useEffect(() => {
		const data = tasks.map((task) => task.genre).reduce(
			(acc, c) => {
				acc[c + 1] += 1
				return acc
			}, Array(17).fill(null).map(() => 0))
		setData(data.map((value, name) => ({ name: `${name}`, value: `${value}` })))
	}, [tasks])
	


	return (
		<div style={{overflowY: "auto"}}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" style={{marginRight: "3rem"}}>
						MeAble
					</Typography>
					<Tabs value={page} onChange={(_, i) => setPage(i)} aria-label="simple tabs example">
						<Tab label="一覧表示"/>
						<Tab label="グラフ表示"/>
						<Tab label="ポイント付与"/>
					</Tabs>
				</Toolbar>
			</AppBar>
			{
				page === 0 &&
				<TableContainer component={Paper}>
					<Table style={{minWidth: "650px"}} size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell>ミッションタイトル</TableCell>
								<TableCell align="right">作成者</TableCell>
								<TableCell align="right">クラス</TableCell>
								<TableCell align="center">獲得ポイント</TableCell>
								<TableCell align="center">SDGs</TableCell>
								<TableCell align="center">最終更新</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tasks.map((task) => (
								<TableRow key={task.id}>
									<TableCell component="th" scope="row">
										{task.title}
									</TableCell>
									<TableCell align="right">{task.appUser.userName}</TableCell>
									<TableCell align="right">{task.appUser.classId}</TableCell>
									<TableCell align="center">{task.pointHistory.length}</TableCell>
									<TableCell align="center">{task.genre}</TableCell>
									<TableCell align="right">{task.updatedAt?.toFormat("yyyy年MM月dd日HH時mm分")}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			}
			{
				page === 1 &&
				<ScatterChart
					width={400}
					height={400}
					margin={{
						top: 20, right: 20, bottom: 20, left: 20,
					}}
				>
					<CartesianGrid />
					<XAxis type="number" dataKey="x" name="stature" unit="cm" />
					<YAxis type="number" dataKey="y" name="weight" unit="kg" />
					<Tooltip cursor={{ strokeDasharray: '3 3' }} />
					<Scatter name="A school" data={data} fill="#8884d8" />
				</ScatterChart>
				// <PieChart width={400} height={400} data={data}>
				// 	<Pie data={data} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" />
				// 	<Pie data={data} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
				// </PieChart>
			}
		</div>
	)
}
