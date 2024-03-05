// 조합 돌리기
const combination = (ary,n) =>{
    if(n==1) return ary.map(v=>[v])
    const ret = []
    ary.forEach((fixed,idx) => {
        const rest = ary.slice(idx+1)
        const combinations = combination(rest,n-1)  //재귀 함수로 조합 다시 돌려서 저장
        const attach = combinations.map(v=>[fixed, ...v])
        ret.push(...attach)
    })
    return ret
}

// 주사위 프로젝트 시작
function solution(dice){

    // 돌린 주사위 데이터 저장
    const diceData = (ary, dice, map) => {
        if(ary.length==dice.length){
            const sum = ary.reduce((a,c) => a+c,0)
            if(map.get(sum)) map.set(sum, map.get(sum)+1)
            else map.set(sum,1)
        return
        }
        const ret = []
        for(let i = 0; i < 6; i++){     // 6개의 주사위 눈 한번씩 돌리기
            ary.push(dice[ary.length][i])
            diceData(ary,dice,map)
            ary.pop()
        }
        return ret
    }

    let reAry = []
    let retCnt = 0

    const diceIdx = [...Array(dice.length)].map((_,i)=>i)

    // 주사위 조합한 정보 리스트로 저장
    const combinations = combination(diceIdx,dice.length/2) 

    for(const aAry of combinations){
        const aDice = aAry.map(v => dice[v])
        const bDice = diceIdx.filter(v=>!aAry.includes(v)).map(v=>dice[v])

        const aMap = new Map()
        const bMap = new Map()
        diceData([],aDice,aMap)
        diceData([],bDice,bMap)
        let ret = 0

        for(const [aCurSum, aCnt] of aMap){
            for(const [bCurSum, bCnt] of bMap){
                if(aCurSum > bCurSum) ret += aCnt * bCnt
            }
        }
        if(ret>retCnt){
            retAry = aAry
            retCnt = ret
        }
    }
    return retAry.map(v=>v+1)
}

console.log(solution([[1,2,3,4,5,6],[3,3,3,3,4,4],[1,2,3,4,5,6],[1,3,3,4,4,4],[1,1,4,4,5,5],[2,3,4,5,6,7]]));