import React, {useState, createContext} from "react";

export const AGVContext_table = createContext();
export const AGVProvider_table = props => {
    const [dataTable, setDataTable] = useState([])
    const [dataTable2, setDataTable2] = useState([])
    const [agvstate, setAgvstate] = useState([]);
    return (
        <AGVContext_table.Provider value = {{
            dataTable,
             setDataTable,
             dataTable2,
             setDataTable2,
             agvstate,
             setAgvstate
        }}>
            {props.children}
        </AGVContext_table.Provider>
    )
}