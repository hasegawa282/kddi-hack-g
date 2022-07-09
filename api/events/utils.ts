import { CalenderEvent } from "."

export const getEvents = (events?: string[], def=['プール', '花火', '夏祭り']) => {
    return events || def
}

export const getFriends = (friends?: string[], def=['こんどう', 'そら', 'てつまる', 'ちか', 'ざいま']) => {
    return friends || def
}

export const getVacationStart = (vacation_start?: Date | string, def=new Date(2022,8,1)) => {
    const start = vacation_start? new Date(vacation_start) : def
    return start
}

export const getVacationEnd = (vacation_end?: Date | string, vacation_start?: Date, def=new Date(2022,8,30)) => {
    // 存在すれば、vacation_end
    if(vacation_end){
        return new Date(vacation_end)
    }
    // vacation_startがある時は、そこから+30日後
    if(vacation_start){
        const new_end = new Date(vacation_start)
        new_end.setDate(new_end.getDate() + 30)
        return new_end
    }
    // それでもない時は、デフォルト値を入れる
    return def
}

export const getCalenderEvents = (params: {
    events: string[];
    friends: string[];
    vacation_start: Date;
    vacation_end: Date;
    
}): CalenderEvent[] => {
    let result: CalenderEvent[] = []
    for(let i = 0; i < params.events.length; i++){
        const candidate_friends = dripFriends(params.friends)
        const title = `${params.events[i]}(${candidate_friends.join('と')})`
        const start = getRandomStartDate(params.vacation_start, params.vacation_end)
        const end = getRandomEndDate(start)
        result.push({
            id: i+'',
            title: title,
            start: convertDateToStr(start),
            end: convertDateToStr(end),
        })
    }
    return result
}

const dripFriends = (friends: string[]) => {
    const result: string[] = []
    // 選ぶ友達の数
    const count = getRandomInt(friends.length - 1, 0)
    let copied_friends = [...friends]
    for(let i = 0; i < count; i++){
        // 抽出する配列のindex
        const index = getRandomInt(copied_friends.length - 1, 0)
        // resultに格納
        result.push(copied_friends[index])
        // 選ばれた要素は候補から外していく
        copied_friends = copied_friends.filter((cf,j) => j !== index)
    }
    return result
}
// min ~ maxのランダム整数取得
const getRandomInt = (max: number, min: number) => {
    const nmin = Math.ceil(min)
    const nmax = ~~max
    // if(context){
    //     context.log(`max=${max}, min=${min}, result=${~~(Math.random() * (nmax - nmin + 1) + nmin)}`)
    // }
    return ~~(Math.random() * (nmax - nmin + 1) + nmin)
}

const getRandomStartDate = (start: Date, end: Date) => {
    const different = end.getTime() - start.getTime()
    const total_different_day = convertMsecToDay(different)
    const random_index = getRandomInt(total_different_day, 0)
    const result_date = new Date(start)
    result_date.setDate(result_date.getDate() + random_index)
    return result_date
}

const getRandomEndDate = (start: Date) => {
    const result_date = new Date(start)
    const random_int = getRandomInt(0,1)
    result_date.setDate(result_date.getDate() + random_int)
    return result_date
}

// m秒 -> 日数
const convertMsecToDay = (msec: number) => {
    return ~~(msec / (1000 * 60 * 60 * 24))
}


const convertDateToStr = (dt: Date) => {
  const year = dt.getFullYear();
  const month = ('00' + (dt.getMonth() + 1)).slice(-2);
  const day = ('00' + dt.getDate()).slice(-2);
  return `${year}-${month}-${day}`
}