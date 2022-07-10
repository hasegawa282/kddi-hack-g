import { CalenderEvent } from "."

export const getEvents = (events?: string[], def=['プール', '花火', '夏祭り']) => {
    let new_events = events || def
    // 宿題があるときは+6する。
    if(new_events.indexOf('宿題') > -1){
        new_events = [...new_events, ...['宿題', '宿題', '宿題', '宿題', '宿題', '宿題']]
    }
    return new_events
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
        // 旅行はSSRなので、30%の確率で出現
        if(params.events[i].indexOf('旅行') > -1 && Math.random() <= 0.3){
            continue
        }
        const candidate_friends = dripFriends(params.friends)
        const title = `${params.events[i]}(${candidate_friends.join('と')})`
        const start = getRandomStartDate(params.vacation_start, params.vacation_end)
        // 宿題はマストで1日で完結する
        const end = getRandomEndDate(start, params.events[i].indexOf('宿題') > -1)
        let resu: CalenderEvent = {
            id: i+'',
            title: title,
            start: convertDateToStr(start),
            end: convertDateToStr(end),
            color: sampleGraghColors[i % sampleGraghColors.length]

        }
        // 海の時は、場所とurlもつける
        if(params.events[i].indexOf('海') > -1){
            const sea_index = getRandomInt(sample_sea.length-1, 0)
            const sea = sample_sea[sea_index]
            resu = {
                ...resu,
                url: sea.url,
                place: sea.place
            }
        }
        result.push(resu)
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
    // 誰もいない時は、ソロイベント
    if(result.length === 0){
        result.push("ソロ")
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

const getRandomEndDate = (start: Date, must_zero?: boolean) => {
    const result_date = new Date(start)
    let random_int = getRandomInt(1,0)
    if(must_zero){
        random_int = 0
    }
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

const sampleGraghColors: string[] = [
    'rgb(31, 119, 180)',
    'rgb(255, 127, 14)',
    'rgb(44, 160, 44)',
    'rgb(214, 39, 40)',
    'rgb(148, 103, 189)',
    'rgb(140, 86, 75)',
    'rgb(227, 119, 194)',
    'rgb(127, 127, 127)',
    'rgb(188, 189, 34)',
    'rgb(23, 190, 207)',
    'rgb(174, 199, 232)',
    'rgb(255, 187, 120)',
    'rgb(152, 223, 138)',
    'rgb(255, 152, 150)',
    'rgb(197, 176, 213)',
    'rgb(196, 156, 148)',
    'rgb(199, 199, 199)',
    'rgb(219, 219, 141)',
    'rgb(158, 218, 229)',
    'rgb(1, 200, 45)',
  ];


const sample_sea = [
    {
        place: "弘法浜遊泳場",
        address: "東京都大島町元町",
        url: "https://www.google.co.jp/maps/search/%E5%BC%98%E6%B3%95%E6%B5%9C%E9%81%8A%E6%B3%B3%E5%A0%B4/@34.7675043,139.338349,13z/data=!3m1!4b1?hl=ja"
    },
    {
        place: "前浜海水浴場",
        address:"東京都神津島村",
        url: "https://www.google.co.jp/maps/place/%E5%8A%A0%E6%B4%A5%E4%BD%90%E5%89%8D%E6%B5%9C%E6%B5%B7%E6%B0%B4%E6%B5%B4%E5%A0%B4/@32.6236579,130.1568937,15z/data=!3m1!4b1!4m5!3m4!1s0x353ff797fdc0cefd:0xfc0a332dd9d4e095!8m2!3d32.6236587!4d130.1656485?hl=ja"
    },
    {
        place: "羽伏浦海岸",
        address:"東京都新島村",
        url: "https://www.google.co.jp/maps/place/%E7%BE%BD%E4%BC%8F%E6%B5%A6%E6%B5%B7%E5%B2%B8/@34.3764131,139.2736756,17z/data=!3m1!4b1!4m5!3m4!1s0x601705fa3832af5b:0x76d6337a2adbfa36!8m2!3d34.3764131!4d139.2758643?hl=ja"
    },
    {
        place: "万立浜海水浴場",
        address:"東京都大島町元町野地",
        url: "https://www.google.co.jp/maps/place/%E4%B8%87%E7%AB%8B%E8%8D%98/@34.7805701,139.3539536,11.1z/data=!4m8!3m7!1s0x60177f4d34654e7d:0x7503ad51a215d868!5m2!4m1!1i2!8m2!3d34.7836175!4d139.3536026?hl=ja"
    },
    {
        place: "淡井浦海水浴場",
        address:"東京都新島村若郷",
        url: "https://www.google.co.jp/maps/search/%E6%B7%A1%E4%BA%95%E6%B5%A6%E6%B5%B7%E6%B0%B4%E6%B5%B4%E5%A0%B4/@34.4159568,139.2813031,17z/data=!3m1!4b1?hl=ja"
    },
    {
        place: "砂の浜海水浴場",
        address:"東京都大島町野増間伏",
        url: "https://www.google.co.jp/maps/place/%E7%A0%82%E3%81%AE%E6%B5%9C/@34.6955615,139.3733887,15z/data=!3m1!4b1!4m5!3m4!1s0x60179d5539d59061:0x308d9e9495f3630e!8m2!3d34.6955623!4d139.3821435?hl=ja"
    },
    {
        place: "若郷前浜海水浴場",
        address:"東京都新島村若郷",
        url: "https://www.google.co.jp/maps/place/%E8%8B%A5%E9%83%B7%E5%89%8D%E6%B5%9C%E6%B5%B7%E6%B0%B4%E6%B5%B4%E5%A0%B4/@34.41944,139.2783533,17z/data=!3m1!4b1!4m5!3m4!1s0x60170ed58186441f:0xd470436fe982cdab!8m2!3d34.41944!4d139.280542?hl=ja"
    },
    {
        place: "弘法浜海水浴場",
        address:"東京都大島町元町2丁目",
        url: "https://www.google.co.jp/maps/place/%E5%BC%98%E6%B3%95%E6%B5%9C/@34.7458758,139.3438845,15z/data=!3m1!4b1!4m5!3m4!1s0x6017786280a6953b:0xab97e68dd083bf4a!8m2!3d34.7458766!4d139.3526393?hl=ja"
    },
    {
        place: "材木座海岸",
        address:"神奈川県鎌倉市材木座",
        url: "https://www.google.co.jp/maps/place/%E3%80%92248-0013+%E7%A5%9E%E5%A5%88%E5%B7%9D%E7%9C%8C%E9%8E%8C%E5%80%89%E5%B8%82%E6%9D%90%E6%9C%A8%E5%BA%A7/@35.3076013,139.5434016,15z/data=!3m1!4b1!4m5!3m4!1s0x601845df3b86e315:0x9e9f0f5fe1a08659!8m2!3d35.3070855!4d139.5521867?hl=ja"
    },
    {
        place: "由比ヶ浜海岸",
        address:"神奈川県鎌倉市由比ガ浜",
        url: "https://www.google.co.jp/maps/place/%E7%94%B1%E6%AF%94%E3%82%AC%E6%B5%9C%E6%B5%B7%E6%B0%B4%E6%B5%B4%E5%A0%B4/@35.3092686,139.5334674,15z/data=!3m1!4b1!4m5!3m4!1s0x601845e5c8ddd717:0x63de5e5c2bc6b1d!8m2!3d35.3092694!4d139.5422222?hl=ja"
    },
]

