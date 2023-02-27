import React, {useState, createContext } from "react";

export const AGVContext = createContext();
export const  AGVProvider=props => {
    const [a, setA] = useState([])
    return (
    <AGVContext.Provider value = {{a, setA}}>
        {props.children}
    </AGVContext.Provider>
)}
// export const  AGVProvider1=props => {
//         const [a1, setA1] = useState([])
//         return (
//         <AGVContext.Provider value = {{a1, setA1}}>
//             {props.children}
//         </AGVContext.Provider>
//     )}
   
    export default AGVContext;


    
    