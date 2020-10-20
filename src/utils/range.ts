const range = function*(min: number, max: number){
	for(let i = min; i < max; i++){
		yield i
	}
}

export default range