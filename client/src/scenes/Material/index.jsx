import React from 'react'
import {useContext, useState, useEffect} from 'react';
import FullCalendar, {formatDate} from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin  from '@fullcalendar/interaction';
import APIs from '../../apis/APIs';
import {
    Box,
    FormControl,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    useTheme,
    Button,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import Header from '../../Components/Header';
import { tokens } from '../../theme';
import { LoadAmount, LoadName } from '../../data/DatatDash';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CustomToolbar from '../table/Toolbar';
import AGVContext from '../../context/AGVContextDash';
import { AGVContext_table } from '../../context/AGVContextTable';


function Material () {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {material, setMaterial} = useContext(AGVContext_table)


    useEffect (() => {
        const Material_1 = async () => {
          try {
            const receive = await APIs.get("/api/materials/");
            setMaterial(receive.data)
            console.log (material)
            //console.log(receive.data)
          }
          
          catch (err)
          {
            console.log (err)
          }
        }
        const interval_Schedule = setInterval(()=> {
          Material_1();
        }, 5000);
        return () => clearInterval(interval_Schedule); //This is important
     }, [])
  
     const rows_2 = material.map(a => {
        return (
          ({
            id: a.material_id,
            material_name: a.material_name,
            material_unit: a.material_unit,
            material_weight: a.material_weight,
            //completion_st: a.completion_st
          })
        )
       })

       const  colums_2 = [ 
        {
          field: "id",
          headerName: "Material ID",
          align: "center",
          headerAlign: "center",
          type: "number",
          width: "300",
        },
        {
          field: "material_name",
          headerName: "Material Name",
          align: "center",
          headerAlign: "center",
          type: "number",
          width: 300
        },
        {
          field: "material_unit",
          headerName: "Material Unit",
          align: "center",
          headerAlign: "center",
          width: 300
        },
  
        {
        field: "material_weight",
        headerName: "Material Weight",
        align: "center",
        headerAlign: "center",
        type: "number",
        width: "300"
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
    m = "20px">
       <Header title = "Material Table" subtitle="Materials delivered by AGVs"
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
        sx = {{
          fontSize: 22
        }}
        //npmautoHeight
          columns={colums_2} 
          rows={rows_2}
          components = {{Toolbar: GridToolbar}} 
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

export default Material 
