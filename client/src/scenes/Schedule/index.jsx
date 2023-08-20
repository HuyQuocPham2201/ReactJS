import React from 'react'
import {useContext, useState, useEffect} from 'react';
import APIs from '../../apis/APIs';
import { Box, useTheme} from "@mui/material";
import Header from '../../Components/Header';
import { tokens } from '../../theme';
import { DataGrid } from '@mui/x-data-grid';
import { AGVContext_table } from '../../context/AGVContextTable';

const Schedule_table = () =>  {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {schedule_3, setSchedule_3} = useContext(AGVContext_table)

    //GET THE SCHEDULE TABLE
    useEffect (() => {
        const Schedule_2 = async () => {
          try {
            const receive = await APIs.get("/api/schedules/");
            setSchedule_3(receive.data)
            console.log (schedule_3)
            //console.log(receive.data)
          }
          
          catch (err)
          {
            console.log (err)
          }
        }
        const interval_Schedule = setInterval(()=> {
          Schedule_2();
        }, 5000);
        return () => clearInterval(interval_Schedule); //This is important
     }, [])
  

    //SEND REQUEST 
    const sendRequest = async (event) =>{
        event.preventDefault()
        try {
          const receive = await APIs.get("/ManageRequests/schedule/")
          console.log(receive);
        } catch (err) {
           console.log(err)
        }
       }

       const rows_2 = schedule_3.map(a => {
        return (
          ({
            id: a.id,
            order_number: a.order_number,
            order_date: a.order_date, 
            from_node: a.from_node,
            to_node: a.to_node,
            load_name: a.load_name,
            load_weight: a.load_weight,
            start_time: a.start_time,
            end_time: a.end_time,
            car_id: a.car_id,
            //completion_st: a.completion_st
          })
        )
       })

       const  colums_2 = [ 
        // {
        //   field: "id",
        //   headerName: "ID",
        //   align: "center",
        //   headerAlign: "center",
        //   type: "number",
        //   flex: 0.5
        // },
        {
          field: "order_number",
          headerName: "Schedule Number",
          align: "center",
          headerAlign: "center",
          type: "number",
          width: "200"
        },
        {
          field: "order_date",
          headerName: "Schedule Date",
          align: "center",
          headerAlign: "center",
          width: 200
        },
  
        {
        field: "from_node",
        headerName: "From Node",
        align: "center",
        headerAlign: "center",
        type: "number"
        },
        {
          field: "to_node",
          headerName: "To Node",
          align: "center",
          headerAlign: "center",
          type: "number"
        }, 
        {
          field: "load_name",
          headerName: "Load Name",
          align: "center",
          headerAlign: "center",
        },
        {
          field: "load_weight",
          headerName: "Load Weight",
          align: "center",
          headerAlign: "center",
          width: 160
        },
        {
          field: "car_id",
          headerName: "Car ID",
          align: "center",
          headerAlign: "center",
          type: "number"
        },
        {
          field: "start_time",
          headerName: "Start Time",
          align: "center",
          headerAlign: "center",
          width: "200"
        },
        {
          field: "end_time",
          headerName: "End Time",
          align: "center",
          headerAlign: "center",
          width: "200"
        },
        // {
        //   field: "completion_st",
        //   headerName: "Status",
        //   align: "center",
        // },
      ];
    
  
  return (
   <Box
    height="80%"
    m = "20px"
    className = "layoutSchedule"
    //gridTemplateColumns="repeat(4, 1fr)"
   >
    <Header title = "Schedule Table" subtitle="Created AGV's Schedule"
    />
 <Box 
      m="40px 0 0 0"
      height="70vh"
        // gridRow= "span 4"
        // m="40px 0 0 0"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
          // "& .GridToolbarExport": {
          //   color: `${colors.grey[100]} !important`,
          // }
        }}
      >
        <DataGrid  
        //npmautoHeight
          sx = {{fontSize: 18}}
          columns={colums_2} 
          rows={rows_2}
          checkboxSelection
         // components = {{Toolbar: GridToolbar}}
          //components = {{Toolbar: CustomToolbar}}
          // checkboxSelection
          // onSelectionModelChange={(p) => {
          //     setSelectedRowIds(p[0]);
          //     console.log(selectedRowIds)
          //   }
          // }
          //hideFooter
        />
        
        </Box>
        </Box>
  )
}

export default Schedule_table;
