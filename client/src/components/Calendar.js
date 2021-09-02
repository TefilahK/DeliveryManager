// import React from 'react'
// import { EventSettingsModel,Agenda, Inject,ScheduleComponent, Week, WorkWeek,Day,Month, } from '@syncfusion/ej2-react-schedule'
// import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';
// import { Ajax } from '@syncfusion/ej2-base';
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { Ajax } from '@syncfusion/ej2-base';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

class ManagerCalendar extends React.Component{
    // localData ={dataSource:[{
    //     StartTime:new Date(2021,0,11,8,30 ),
    //     EndTime:new Date(2021,0,11,8,0 ),
    //     subject:"testing",
    //     IsAllDay:true,
    //     RecurrentRule:'FREQ=DAILY;INTERVAL=1;COUNT=10'
    // }]}
    // remoteData=new DataManager({
    //     url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
    //     adaptor: new ODataV4Adaptor
    // })
    render(){
        return <ScheduleComponent surrentview="Month"
        eventSettings={{ dataSource: this.remoteData }}>
            <Inject services={[Day,Week,WorkWeek,Month,Agenda]}/>
        </ScheduleComponent>
    }
}
export default ManagerCalendar