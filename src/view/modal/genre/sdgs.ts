import { Genre } from "src/data/model/types/genre"

const genres = [
	/* 01 */ { text: "貧困をなくそう", color: "" },
	/* 02 */ { text: "飢餓をゼロに", color: "" },
	/* 03 */ { text: "すべての人に健康と福祉を", color: "" },
	/* 04 */ { text: "質の高い教育をみんなに", color: "" },
	/* 05 */ { text: "ジェンダー平等を実現しよう", color: "" },
	/* 06 */ { text: "安全な水とトイレを世界中に", color: "" },
	/* 07 */ { text: "エネルギーをみんなに そしてクリーンに", color: "" },
	/* 08 */ { text: "働きがいも経済成長も", color: "" },
	/* 09 */ { text: "産業と技術革新の基盤を作ろう", color: "" },
	/* 10 */ { text: "人や国の不平等をなくそう", color: "" },
	/* 11 */ { text: "住み続けられるまちづくりを", color: "" },
	/* 12 */ { text: "つくる責任 つかう責任", color: "" },
	/* 13 */ { text: "気候変動に具体的な対策を", color: "" },
	/* 14 */ { text: "海の豊かさを守ろう", color: "" },
	/* 15 */ { text: "陸の豊かさも守ろう", color: "" },
	/* 16 */ { text: "平和と公正をすべての人に", color: "" },
	/* 17 */ { text: "パートナーシップで目標を達成しよう", color: "" },
]

const getGenre = (genre: Genre) => genres[genre - 1]

export default getGenre