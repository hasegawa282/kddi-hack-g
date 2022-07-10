import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { getCalenderEvents, getEvents, getFriends, getVacationEnd, getVacationStart } from "./utils";

export interface CalenderEvent {
    id?: string;
    title: string;
    url?: string;
    description?: string;
    start: string; // yyyy-mm-dd
    end?: string; // yyyy-mm-dd
    color?: string;
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    context.log(req);
    context.log(`method=${req.method}`);
    const method = req.method || ''
    // POST method
    if(method === 'POST'){
        const request_body = req.body || {}
        context.log(request_body)
        // イベント一覧
        const events: string[] = getEvents(request_body.events)
        // 友人一覧
        const friends: string[] = getFriends(request_body.friends)
        // 休み期間
        // 開始期間(デフォルト2022/8/1)
        const vacation_start = getVacationStart(request_body?.vacation_start)
        // 終了期間(デフォルト2022/9/30)
        const vacation_end = getVacationEnd(request_body?.vacation_end)
        // context.log(events)
        // context.log(friends)
        // context.log(vacation_start)
        // context.log(vacation_end)

        // 返却するイベント一覧
        const calender_events: CalenderEvent[] = getCalenderEvents({
            events: events,
            friends: friends,
            vacation_start: vacation_start,
            vacation_end: vacation_end,
        })
        // 宿題の数
        const homeworks: number = calender_events.filter((ce) => ce.title.indexOf('宿題') > -1).length
        context.log(calender_events)
        context.res = {
            // status: 200, /* Defaults to 200 */
            status: 200,
            body: {
                homeworks: homeworks,
                items: calender_events,
            }
        };
        return
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        status: 200,
        body: {
            items: [],
        }
    };

};



export default httpTrigger;