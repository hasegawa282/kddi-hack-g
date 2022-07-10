import { DateInput } from "@fullcalendar/react";

export interface Event {
    id?: string;
    title: string;
    start: string; // yyyy-mm-dd
    end?: string; // yyyy-mm-dd
    url?: string;
    place?: string;
    color?: string;
}

const sample_event1: Event = {
    id: "1",
    title: "はせとBBQ",
    start: "2022-08-01",
    color: "blue"
}

const sample_event2: Event = {
    id: "2",
    title: "はせと水族館",
    start: "2022-08-08",
    color: "red"
}


export interface RequestEventsGetProps {
    friends?: string[]; // 友人
    events?: string[]; // イベント
    frequency?: number; // 外出頻度
    vacation_start?: DateInput;
    vacation_end?: DateInput;
}

export interface ResponseEventsGetProps {
    items: Event[];
    homeworks: number;
}

/** イベントを作成して取得するAPI**/
export const eventsPostAPI = async(params: RequestEventsGetProps): Promise<ResponseEventsGetProps> => {
    // 本番以外はサンプルデータ返却
    if (process.env.NODE_ENV !== 'production') {
        return {
            items: [sample_event1, sample_event2],
            homeworks: 3,
        }
    }
    const data = await fetch(`/api/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });
    const json = await data.json()
    return {
        items: json.items,
        homeworks: json.homeworks
    }
    
}