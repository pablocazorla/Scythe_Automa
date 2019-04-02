const gainAI = (gains, pl) => {
	let o = {
		'worker': 0,
		'mech': 0,
		'power': 0,
		'money': 0,
		'card': 0,
	};
	gains.forEach(function(ga){
		const enabledByFaction = (ga.faction && ga.faction === pl.factionName) || !ga.faction;
		if(enabledByFaction){
			let num = ga.count ? ga.count : 1;
			switch(ga.type){
				case 'worker':
					num = pl.board.worker >= num ? num : pl.board.worker;
					o.worker += num;
					break;
				case 'mech':
					num = pl.board.mech >= num ? num : pl.board.mech;
					o.mech += num;
					break;
				case 'power':
					num = (pl.power + num) > 16 ? (16 - pl.power) : num;
					o.power += num;
					break;
				default:
					o[ga.type] += num;
			}			
		}
	});
	if(o.worker > 0 || o.mech > 0 || o.power > 0 || o.money > 0 || o.card > 0){
		for(var w in o){
			if(o[w] === 0){
				delete o[w];
			}
		}
		return o;
	}else{
		return null;
	}

	
};

export default gainAI;