import React, {useState, createContext} from "react";

export const AGVContext_table = createContext();
export const AGVProvider_table = props => {
    const [dataTable, setDataTable] = useState([])
    const [dataTable2, setDataTable2] = useState([])
    const [agvstate, setAgvstate] = useState([]);
    const [schedule_1, setSchedule_1] = useState([]);
    const [schedule_2, setSchedule_2] = useState([]);
    const [schedule_3, setSchedule_3] = useState([]);
    const [material, setMaterial] = useState([]);


    return (
        <AGVContext_table.Provider value = {{
            dataTable,
             setDataTable,
             dataTable2,
             setDataTable2,
             agvstate,
             setAgvstate,
             schedule_1, 
             setSchedule_1,
             schedule_2,
             setSchedule_2,
             schedule_3,
             setSchedule_3,
             material,
             setMaterial,
        }}>
            {props.children}
        </AGVContext_table.Provider>
    )
}