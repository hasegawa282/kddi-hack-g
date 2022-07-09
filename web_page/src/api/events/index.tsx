import { DateInput } from "@fullcalendar/react";

export interface Event {
    id?: string;
    title: string;
    start: string; // yyyy-mm-dd
    end?: string; // yyyy-mm-dd
    url?: string;
}

const sample_event1: Event = {
    id: "1",
    title: "はせとBBQ",
    start: "2022-08-01",
}

const sample_event2: Event = {
    id: "2",
    title: "はせと水族館",
    start: "2022-08-08",
}


export interface RequestEventsGetProps {
    friends?: string[]; // 友人
    events?: string[]; // イベント
    frequency?: number; // 外出頻度
    vacation_start?: DateInput;
    vacation_end?: DateInput;
}

/** イベントを作成して取得するAPI**/
export const eventsPostAPI = async(params: RequestEventsGetProps): Promise<Event[]> => {
    // 本番以外はサンプルデータ返却
    if (process.env.NODE_ENV !== 'production') {
        return [sample_event1, sample_event2]
    }
    const data = await fetch(`/api/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });
    console.log(data)
    const json = await data.json()
    console.log(json)
    return json.items
    
}