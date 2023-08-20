
import { Box, FormControl, InputLabel, TextField, Typography,Button , useTheme, Checkbox, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
//import { DataGrid, GridToolbar, GridToolbarExport, GridToolbarExportContainer, GridToolbarColumnsButton, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { w3cwebsocket as W3CwebSocket } from "websocket";
import { useState, useEffect, useContext } from "react";
import APIs from "../../apis/APIs";
import clsx from 'clsx';
import { Guidance_type, Load_transfer } from "../../data/DataTable";
import { AGVContext_table } from "../../context/AGVContextTable";
import CustomToolbar from "./Toolbar";


const client = new W3CwebSocket("ws://100.88.184.54:8000/ws/agvdata")

const Table = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
  // const {a, setA} = useContext(AGVContext)
  const {dataTable, setDataTable} = useContext(AGVContext_table)
  const [id, setId] = useState('')
  const [model, setModel] = useState('')
  const [battery, setBattery] = useState('')
  const [load_capacity, setLoad_capacity] = useState('')
  const [speed, setSpeed] = useState('')
  const [guidance, setGuidance] = useState('')
  const [load_transfer, setLoad_transfer] = useState('')
  const [active, setActive] = useState(true)
  
  const {dataTable2, setDataTable2} = useContext(AGVContext_table);
  // const {agvstate, setAgvstate} = useContext(AGVContext_table);

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
    const send = await APIs.post("/api/agvSpecs/", {
      "vehicle_id": id,
      "vehicle_model": model,
      "battery_capacity": battery,
      "load_capacity": load_capacity,
      "travel_speed": speed,
      "guidance_type": guidance,
      "load_transfer": load_transfer,
      "is_active": active,
    })
    console.log(send);
} catch (err) {}
}
useEffect (() => {
  const Table_2 = async () => {
    try {
      const receive = await APIs.get("/api/agvSpecs/");
      setDataTable2(receive.data)
      console.log(dataTable2)

    } catch (err) {
      console.log (err.message)
  
    }
  }
  const interval_Table2 = setInterval(() => {
    Table_2();
  }, 10000);

  return () => clearInterval(interval_Table2); //This is important

}, [])
 

//  const rows1 = dataTable2.map((agv) => ({
//     id: agv.vehicle_id,
//     // Inactivecar: agv.vehicle_id  
//  }))
//  console.log(rows1)

 
  // useEffect(() => {
  //  const fetchData = async () => {
  //   try {
  //   const response = await APIs.get("/team")
  //   console.log(response)
  //   //  const b = response.data.data
  //   //  console.log(b)
  //   setA1(response.data.data.AGV_data_1)
  //   console.log(a1)
  //   } catch (err) {}
  // }
  //  setInterval(async() => await fetchData(), 2000);
  // },[])

 

  client.onopen = () => {
    console.log("Connected")
  }

  
   client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data)
    setDataTable(dataFromServer)
    console.log(dataTable)
   }

  const rows = dataTable.map(data => 
    { 
      if (data.fields.car_state === '1') {
        data.fields.car_state = 'Active'
      }
      if (data.fields.car_state === '2') {
        data.fields.car_state = 'Not Active'
      }
      
    return (
    ({
      id: data.fields.car_id,
      car_state: data.fields.car_state,
      car_speed: data.fields.car_speed,
      car_battery: data.fields.car_battery_capacity,
      location: data.fields.previous_node
    
  }))
  } 
  )

  console.log(rows)

  
  
  const columns = [
    {field: "id", 
    headerName: "ID",
    headerAlign: "center",
    align: "center",
  },
    { field: "car_state", 
    headerName: "Car State",
    // cellClassName: "name-column--cell",
    headerAlign: "center",
    align: "center",
  },
    {field: "car_speed", 
    headerName: "Car Speed",
    headerAlign: "center",
    align: "center",
  },
    {field: "car_battery", 
    headerName: "Car Battery",
    headerAlign: "center",
    align: "center"},

    {field: "location", 
    headerName: "Location",
    headerAlign: "center",
    align: "center" },
    
    {field: "allagv", 
    headerName: "All AGV",
    headerAlign: "center",
    align: "center" }
    // {
    //   field: "LoadName",
    //   headerName: "Load Name",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    // {
    //   field: "Number",
    //   headerName: "Number",
    //   type: "number",
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //     field: "Weight",
    //     headerName: "Weight",
    //     type: "number",
    //     headerAlign: "center",
    //     align: "center",
    //   },
    // {
    //   field: "StartTime",
    //   headerName: "Start Time",
    //   flex: 1,
    // },
    // {
    //   field: "Inbound",
    //   headerName: "Inbound",
    //   flex: 1,
    //   headerAlign: "center",
    //   align: "center",
    // },
    // {
    //     field: "Outbound",
    //     headerName: "Outbound",
    //     flex: 1,
    //     headerAlign: "center",
    //     align: "center",
    //   },
  ];

  //Table 2 
  const columns_1 = [
    {field: "Inactivecar",
     headerName: "All AGV ID",
     type: 'number',
     headerAlign: "center",
     align: "center",
     width: "180"
    //  cellClassName: (params) => {
    //   if (params.value == null) {
    //     return '';
    //   } 
    //   return clsx('super-app', {
    //     not_active: params.value < 5,
    //     active: params.value > 5,
    //   })
       
    // }
  },
  {field: "carstate",
  type: 'string',
  headerName: "AGV State",
  headerAlign: "center",
  align: "center",
  cellClassName: (params) => {
    if (params.value == null) {
      return '';
    } 
    return clsx('super-app', {
      active: params.value === 'Active',
      not_active: params.value ==='Not Active'
    })
     
  }
}
  ]
//Table 2_data
  // const objIndex1 = dataTable2.findIndex((obj => obj.is_active = 'true'))
  // const objIndex2 = dataTable2.findIndex((obj => obj.is_active == 'false'))
  // dataTable2[objIndex2].is_active = "Not Active"
  // console.log(dataTable2)
  // console.log(objIndex1)

  const rows2 = dataTable2.map((a) => {
    if (a.is_active === false) {
      a.is_active = 'Not Active'
    }  else if(a.is_active === true) {
      a.is_active = 'Active'
    }
   
    return (
      ({
      Inactivecar: a.vehicle_id,
      id: a.vehicle_id,
      carstate: a.is_active
      
    }) 
      )
   
  // dataTable2[objIndex1].is_active = "On Active"
 }
  )
      // const datafilter = dataTable2.filter(num => {
      //   if(!num.is_active) {
      //     console.log(num.vehicle_id)
      //   }
      //   })

  return (
  //Columns
    <Box 
    backgroundColor={colors.primary[400]}
    display ="grid"
    // gridTemplateColumns="repeat(9, 1fr)"
    gridTemplateColumns="repeat(10, 1fr)"
    gridTemplateRows= "repeat(4, 150px)"
    className="layoutTeam"
    borderBottom={`4px solid ${colors.primary[500]}`}                        
>
  {/* COLUMNS 1 with 8 nodes
      Each Node has 3 box
      1 biggest wrap 2 inside
  */}
  {/* <Box gridArea="n1"
      borderBottom={`4px solid ${colors.primary[500]}`}
      borderRight ={`4px solid ${colors.primary[500]}`}
  > 
  <Box sx = {{ backgroundColor: colors.greenAccent[400]}}
   className = "Node_text_header"
>
    Node 1
  </Box>
   <Box className ="Node_text">
    ID: 
    <br/>
    Line:
    <br/>
    Material ID:
    <br/> 
    Number: 
    </Box>
  </Box>
  <Box gridArea="n2"
      borderBottom={`4px solid ${colors.primary[500]}`}
      borderRight ={`4px solid ${colors.primary[500]}`}

> 
<Box sx = {{ backgroundColor: colors.redAccent[700]}}
   className = "Node_text_header"
>
    Node 2
  </Box>
   <Box className ="Node_text">
    ID: 
    <br/>
    Line:
    <br/>
    Material ID:
    <br/> 
    Number: 
    </Box>
</Box>
  <Box gridArea="n3"
  borderBottom={`4px solid ${colors.primary[500]}`}
  borderRight ={`4px solid ${colors.primary[500]}`}
  > 
  <Box sx = {{ backgroundColor: colors.greenAccent[400]}}
   className = "Node_text_header"
>
    Node 3
  </Box>
   <Box className ="Node_text">
    ID: 
    <br/>
    Line:
    <br/>
    Material ID:
    <br/> 
    Number: 
    </Box>
  </Box>
  <Box gridArea="n4"
  borderBottom={`4px solid ${colors.primary[500]}`}
  borderRight ={`4px solid ${colors.primary[500]}`}
  > 
  <Box sx = {{ backgroundColor: colors.greenAccent[400]}}
   className = "Node_text_header"
>
    Node 4
  </Box>
   <Box className ="Node_text">
    ID: 
    <br/>
    Line:
    <br/>
    Material ID:
    <br/> 
    Number: 
    </Box>
  </Box>
  <Box gridArea="n5"
  borderBottom={`4px solid ${colors.primary[500]}`}
  borderRight ={`4px solid ${colors.primary[500]}`}
  > 
  <Box sx = {{ backgroundColor: colors.redAccent[700]}}
   className = "Node_text_header"
>
    Node 5
  </Box>
   <Box className ="Node_text">
    ID: 
    <br/>
    Line:
    <br/>
    Material ID:
    <br/> 
    Number: 
    </Box>
  </Box>
  <Box gridArea="n6"
  borderBottom={`4px solid ${colors.primary[500]}`}
  borderRight ={`4px solid ${colors.primary[500]}`}
  > 
  <Box sx = {{ backgroundColor: colors.greenAccent[400]}}
   className = "Node_text_header"
>
    Node 6
  </Box>
   <Box className ="Node_text">
    ID: 
    <br/>
    Line:
    <br/>
    Material ID:
    <br/> 
    Number: 
    </Box>
  </Box>
  <Box gridArea="n7"
    borderRight ={`4px solid ${colors.primary[500]}`}
  > 
  <Box sx = {{ backgroundColor: colors.greenAccent[400]}}
   className = "Node_text_header"
>
    Node 7
  </Box>
   <Box className ="Node_text">
    ID: 
    <br/>
    Line:
    <br/>
    Material ID:
    <br/> 
    Number: 
    </Box>
  </Box>
  <Box gridArea="n8"
    borderRight ={`4px solid ${colors.primary[500]}`}

  > 
  <Box sx = {{ backgroundColor: colors.redAccent[700]}}
   className = "Node_text_header"
>
    Node 8
  </Box>
   <Box className ="Node_text">
    ID: 
    <br/>
    Line:
    <br/>
    Material ID:
    <br/> 
    Number: 
    </Box>
  </Box> */}

 {/* COLUMNS 2 */}

  <Box gridArea="c"
    display = "flex"
  >
    <Box 
        width =  "100%"
        // gridRow= "span 4"
        // m="40px 0 0 0"
        // height="80vh"
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
        sx = {{fontSize: 18}}
        rows={rows}
        columns={columns} 
         //components = {{Toolbar: GridToolbar}}
         components = {{Toolbar: CustomToolbar}}

        />
        
        </Box>

  </Box>

  {/* COLUMNS 2 */}

  <Box gridArea="a"
      borderRight=  {`4px solid ${colors.primary[500]}`}
      >
    <Box
    width =  "100%"
    height=" 100%"
    // gridRow= "span 4"
    // m="40px 0 0 0"
    // height="80vh"
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
      "& .super-app.active" : {
          color: `${colors.greenAccent[400]}`,
      },
      "& .super-app.not_active" : {
        color: `${colors.redAccent[400]}`,
    },
    }}>
      <DataGrid 
      initialState={{
        sorting: {
          sortModel: [{sort:'asc', field:"Inactivecar"}]

        }
      
      }}
      sx = {{fontSize: 17}}
      hideFooterPagination
      columns= {columns_1}
      rows = {rows2}
      components = {{Toolbar: CustomToolbar}}
      />
    
    </Box>
    {/* <Box
    sx = {{textAlign: "center"
  }}
    >
    <Button
      sx = {{backgroundColor: colors.greenAccent[400],
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "14px",
        padding: "10px 20px"}}      
      >
        Submit
      </Button>
      </Box>  */}
  </Box>

  {/* COLUMNS 3 
  1 Command box on top 
  7 box under to present choose
  */}
  <Box gridArea="d" 
  overflow = 'auto'
  > 
  <Box 
       p = "15px"
       backgroundColor = {colors.greenAccent[400]}
       overflow = 'auto'
       display="flex"
       justifyContent="space-between"
       
       >
        <Typography sx = {{fontSize: "x-large", fontWeight: "bold", alignItems: "center"}}>
        Manage AGV.
        </Typography>
       </Box>
       <Box className = "Command_Box_Team"
       sx = {{mt: "5%"}}
       >
        
        Vehicle ID: 
        <div> 
        <FormControl sx = {{m: -5, ml: 18, width: "60%"}}>
            <TextField 
            value = {id}
            onChange = {event => setId(event.target.value)}
            label = "Select Vehicle ID"
            />
        </FormControl>
        </div>
        
       </Box>
       <Box className = "Command_Box_Team">
       Vehicle Model:
        <div>
        <FormControl sx =  {{m: -5, ml: 18, width: "60%"}}
       
        >
          <TextField 
          value = {model}
          onChange = {event => setModel(event.target.value)}
          label = "Select Vehicle Model"
          />
        </FormControl>
        </div>
       </Box>
       <Box className = "Command_Box_Team">
       Battery Capacity:
        <div>
        <FormControl sx = {{m: -5, ml: 18, width: "60%"}}>
            <TextField 
            value = {battery}
            onChange = {event => setBattery(event.target.value)}
            label = "Select Battery Capacity"
            />
        </FormControl>
        </div>
       </Box>
       <Box className = "Command_Box_Team">
        Load Capacity:
        <div>
        <FormControl sx = {{m: -5, ml: 18, width: "60%"}}>
           <TextField 
           value={load_capacity}
           onChange = {event => setLoad_capacity(event.target.value)}
           label = "Select Load Capacity"
           />
        </FormControl>
        </div>
       </Box>
       <Box className = "Command_Box_Team"
       >
        Travel Speed:
        <div>
        <FormControl  sx = {{m: -5, ml: 18, width: "60%"}}>
        <TextField 
        value = {speed}
        onChange = {event => setSpeed(event.target.value)}
        label = "Select Travel Speed"
        />
        </FormControl>
        </div>
       </Box>
       <Box className = "Command_Box_Team">
        Guidance Type: 
        <div>
        <FormControl sx = {{m: -5, ml: 18, width: "60%"}}>
          <InputLabel>Select Guidance Type</InputLabel>
          <Select
          value = {guidance}
          onChange = {event => setGuidance(event.target.value)}
          label = "setGuidance"
          >
           {Guidance_type.map(data => (
            <MenuItem
            key = {data}
            value = {data}
            >{data}
            </MenuItem>
           ))}
          </Select>
          {/* <TextField
          value = {guidance}
          onChange = {event => setGuidance(event.target.value)}
          label = "Select Guidance Type"
          /> */}
        </FormControl>
        </div>
       </Box>
       <Box className = "Command_Box_Team">
        Load Transfer: 
        <div>
        <FormControl sx = {{m: -5, ml: 18, width: "60%"}}>
          <InputLabel>Select Load Transfer</InputLabel>
          {/* <TextField 
          value = {load_transfer}
          onChange = {event => setLoad_transfer(event.target.value)}
          label = "Select Load Transfer"
          /> */}
          <Select
          value = {load_transfer}
          onChange = {event => setLoad_transfer(event.target.value)}
          label = "setLoad_transfer"
          > 
          {/* Because define value as array so => () */}
          {Load_transfer.map((load_transfer) => (
            <MenuItem
            key = {load_transfer}
            value = {load_transfer}
            >{load_transfer}</MenuItem>
          ))}
          {/* <MenuItem value = {AUT0}>Automatic</MenuItem>
          <MenuItem value = {MAN}>Manual</MenuItem> */}


          </Select>
        </FormControl>
        </div>
       </Box>
       <Box className = "Command_Box_Team" 
       sx = {{mt: "-1%"}}
       >
        Active: 
        <div>
        <FormControl sx = {{m: -4, ml: 7, width: "200px"
      }}>
           <Checkbox 
           sx = {{color: "white"}}
           checked = {active}
           onChange = {event => setActive(event.target.checked)}
           />
        </FormControl>
        </div>
       </Box>

       <Box
       sx = {{textAlign: "center",
       mt: "-4%"

      }}
       >
        <Button
        sx = {{backgroundColor: colors.redAccent[400],
          color: colors.grey[100],
          padding: "10px 20px",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "14px",
        }}
        onClick = {handleSubmit}
        >
          Select
        </Button>
       </Box>

</Box>
    </Box>

)};

export default Table;
