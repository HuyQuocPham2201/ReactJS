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
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from '../table/Toolbar';
import AGVContext from '../../context/AGVContextDash';
import { AGVContext_table } from '../../context/AGVContextTable';
import CSVtoJSONConverter from '../../Components/import_file';
import { ForkLeftRounded } from '@mui/icons-material';
const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState ([]);
    const [loadname, setLoadname] = useState('')
    const [loadamount, setLoadamount] = useState('')
    const [start_time, setStart_time] = useState('')
    const [start_point, setStart_point] = useState('')
    const [end_point, setEnd_point] = useState('')
    const [date, setDate] = useState('')
    const {schedule_1, setSchedule_1} = useContext(AGVContext_table)
    const {schedule_2, setSchedule_2} = useContext(AGVContext_table)
    const [selectedRowIds, setSelectedRowIds] = useState();
    const [notif, setNotif] = useState(); 

    // take the row ids 
    
    const onClickedButton = async (event) => {
        event.preventDefault()
        try {
          const send = await APIs.post("/api/orders/", {
             "load_name": loadname,
             "load_amount": loadamount,
             "start_time": start_time,
             "from_node": start_point,
             "to_node": end_point,
             "order_date": date
          })
          console.log(send);
          if (send.status == 201)
          {
            setNotif("Created Orders Successfully!")
          }
        } catch (err) {}
      }


    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event")
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allday:selected.allDay, 
            });
        }
    }
    const handleEventClick = (selected) => {
        if ( 
            window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)
        ) {
            selected.event.remove();
        }
    }

    const sendRequest = async (event) =>{
      event.preventDefault()
      try {
        const receive = await APIs.get("/ManageRequests/schedule/")
        console.log(receive);
        if (receive.status == 200)
        {
          setNotif("Schedule Created Successfully!")
        }
      } catch (err) {
         console.log(err)
      }
     }


    const deleteOrder = async (event) =>{
      event.preventDefault()
      try {
      const receive = await APIs.delete(`/api/orders/${selectedRowIds}`)
        console.log(receive);
        if (receive.statusText == 'No Content')
        {
           //alert("Delete Order Succesfully!")
           setNotif("Delete Order Successfully!")
           //clearTimeout(myTimeout)
        }
      } catch (err) {
         console.log(err)
      }
     }

    const  colums = [ 
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
        headerName: "Order Number",
        align: "center",
        headerAlign: "center",
        type: "number",
        width: 150
  
      },
      {
        field: "order_date",
        headerName: "Order Date",
        align: "center",
        headerAlign: "center",
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
        field: "load_amount",
        headerName: "Load Weight",
        align: "center",
        headerAlign: "center",
        width: 170
      },
      {
        field: "start_time",
        headerName: "Start Time",
        align: "center",
        headerAlign: "center",
      },
      // {
      //   field: "completion_st",
      //   headerName: "Status",
      //   align: "center",
      // },
    ]



  useEffect (() => {
    const Schedule = async () => {
      try {
        const receive = await APIs.get("/api/orders/");
        setSchedule_1(receive.data)
        console.log (schedule_1)
        //console.log(receive.data)
        //console.log(selectedRowIds);
      }
      
      catch (err)
      {
        console.log (err)
      }
    }
    const interval_Schedule = setInterval(()=> {
      Schedule();
    }, 5000);
    return () => clearInterval(interval_Schedule); //This is important
 }, [])
    
   const rows = schedule_1.map(a => {
    return (
      ({
        id: a.request_id,
        order_number: a.order_number,
        order_date: a.order_date, 
        from_node: a.from_node,
        to_node: a.to_node,
        load_name: a.load_name,
        load_amount: a.load_amount,
        start_time: a.start_time,
        end_time: a.end_time,
        //car_id: a.car_id,
        //completion_st: a.completion_st
      })
    )
   })

   


    return (
        <Box
        display = "grid"
        //gridTemplateColumns="repeat(4, 1fr)"
        className = "layoutCalendar"
        backgroundColor = {colors.primary[400]}
        > 
        {/* <Header title = "CALENDAR" subtitle = "Full Calendar Interactive Page" /> */}
    <Box 
    width = "100%"
    gridArea="a"
    //borderRight = {`10px solid ${colors.primary[500]}`}
    >
         <Box 
        width =  "100%"
        // gridRow= "span 4"
        // m="40px 0 0 0"
        height = "70%"
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
          sx = {{fontSize: 17}}
          columns={colums} 
          rows={rows}
          //components = {{Toolbar: GridToolbar}}
          //components = {{Toolbar: CustomToolbar}}
          checkboxSelection
          onSelectionModelChange={(p) => {
              setSelectedRowIds(p[0]);
              console.log(selectedRowIds)
            }
          }
          hideFooter
        />
        
        </Box>
        <Box
     width = "100%"
     height = "30%"
    //  sx= {{textAlign: "left" 
    // }}    
    // borderLeft={`10px solid ${colors.primary[500]}`}                   
     > 
     <Box
        sx= {{textAlign: "left"  }}    
     >
      <Button
        sx = {{backgroundColor: colors.blueAccent[600],
          color: colors.grey[100],
          padding: "20px 18px",
          fontWeight: "bold",
          fontSize: "13px",
          textAlign: "left" 
        }}
        onClick = {deleteOrder}
        >
          Delete Order
        </Button>
        </Box>
      <Box
          sx= {{textAlign: "center"}}  
          borderBottom ={`10px solid ${colors.primary[400]}`}
  
      >
        <Typography
        sx = {{
          fontSize: "medium",
          fontWeight: "bold",
        }}>
          {notif}
        </Typography>
      </Box>

        <Box
         sx= {{textAlign: "center"}}    
        >
        <Button
        sx = {{backgroundColor: colors.greenAccent[500],
          color: colors.grey[100],
          padding: "18px 40px",
          //alignItems: "center",
          fontWeight: "bold",
          fontSize: "20px",
        }}
        onClick = {sendRequest}
        >
          Generate Schedule
        </Button>
        </Box>
       </Box>

       {/* <Box
     width = "80%"
     height = "20%"
     borderRight = {`10px solid ${colors.primary[400]}`}
     sx= {{textAlign: "center" 
    }}    
    // borderLeft={`10px solid ${colors.primary[500]}`}                   
     > 
    <Button
        sx = {{backgroundColor: colors.greenAccent[500],
          color: colors.grey[100],
          padding: "30px 50px",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "17px",
        }}
        onClick = {sendRequest}
        >
          Generate Schedule
        </Button>
       
       </Box> */}

    </Box>

     {/* TABLE 2 - SCHEDULE  */}
    {/* <Box
    gridArea = "d"
    width = "100%"
    borderLeft={`10px solid ${colors.primary[500]}`}                   

    > 
       <Box 
        width =  "100%"
        height = "80%"
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
        autoPageSize
        //npmautoHeight
          columns={colums_2} 
          rows={rows_2}
          //components = {{Toolbar: GridToolbar}}
          //components = {{Toolbar: CustomToolbar}}
          // checkboxSelection
          // onSelectionModelChange={(p) => {
          //     setSelectedRowIds(p[0]);
          //     console.log(selectedRowIds)
          //   }
          // }
          hideFooter
        />
        
        </Box>
        <Box
     width = "100%"
     //gridArea="d"
     height = "20%"
     borderRight = {`10px solid ${colors.primary[400]}`}
     sx= {{textAlign: "center" 
    }}    
    // borderLeft={`10px solid ${colors.primary[500]}`}                   

     > 
       
       </Box>


    </Box> */}
  
  {/* COLUMN 3 - COMMAND */}
    <Box gridArea="b"
    overflow= "auto"
    borderLeft={`10px solid ${colors.primary[500]}`}                   
    >
         <Box
  className="Command_header_calendar"
  p = "8px"
  width = "100%"
  sx = {{textAlign: "left",
  fontSize: "x-large",
  fontWeight: "bold"
}}
borderBottom ={`10px solid ${colors.primary[500]}`}

  >
    Place Orders.
  </Box>
  <Box 
  borderBottom ={`10px solid ${colors.primary[500]}`}
  sx = {{ 
  mt: 1.5,
  marginBottom: "10px"
  }}
  >
    <Typography
    sx = {{fontWeight: "bold",
    marginBottom: "10px",
    fontSize: "18px",
    marginLeft: "10px"
  }} 
    
    >
    Import CSV File: 
    </Typography>
    <div>
    <CSVtoJSONConverter />
    </div>
    
  </Box>

  <Box
  className = "Command_Box_Calendar"
  //borderTop ={`10px solid ${colors.primary[500]}`}

  >
    Load Name: 
    <div>
    <FormControl sx = {{m: -5, ml: 15, width: "55%" }}>
    <InputLabel>Select Load Name </InputLabel>
    <Select
    value = {loadname}
    onChange = {e => setLoadname(e.target.value)}
    >
     {LoadName.map(a => {
      return (
        <MenuItem
        key = {a}
        value =  {a}
        >
        {a}
        </MenuItem>
      )
     })}
     
    </Select>

    {/* <TextField
    label = "Select Load Name"
    value = {loadname}
    onChange = {event => setLoadname(event.target.value)}
    /> */}
 
    </FormControl>
    </div>
  
  </Box>
  <Box
  className = "Command_Box_Calendar"
  > 
   Load Amount:
   <div>
    {/* <InputLabel>Select Load Amount</InputLabel> */}
    <FormControl sx = {{m: -5, ml: 15, width: "55%"}}>
    {/* <TextField
    label ="Select Load Amount"
     value = {loadamount}
     onChange = {event => setLoadamount(event.target.value)}
    /> */}

    <InputLabel>Select Load Amount</InputLabel>
    <Select
    value = {loadamount}
    label = "setLoadamount"
    onChange = {event => setLoadamount(event.target.value)}
    >
     {LoadAmount.map((a) => (
  
      <MenuItem
      key = {a}
      value = {a}
      >
      {a}
      </MenuItem>
     ))}
    </Select>
    </FormControl>
   </div>
  </Box>
  <Box className = "Command_Box_Calendar"
  >
    Starting Time: 
    <div>
    <FormControl
    sx = {{m: -5, ml: 15, width: "55%"}}
    >
    {/* <InputLabel>Select Starting Time</InputLabel> */}
    <TextField 
    label = "Select Starting Time"
    value = {start_time}
    onChange = {(event) => setStart_time(event.target.value)}
    />

    </FormControl>
    </div>
  </Box>

  <Box className = "Command_Box_Calendar"> 
  Starting Points: 
  <div>
    <FormControl sx = {{m: -5, ml: 15, width: "55%"}}>
        <TextField
        value = {start_point}
        onChange = {(event) => {setStart_point(event.target.value)}}
        label = "Select Start Point"
        />
    </FormControl>
    </div>
  </Box>
  <Box className="Command_Box_Calendar">
    Ending Points: 
    <div>
    <FormControl sx = {{m: -5, ml: 15, width: "55%"}}>
      <TextField 
      value = {end_point}
      onChange = {event => setEnd_point(event.target.value)}
      label = "Select Ending Points"
      />
    </FormControl>
    </div>
  </Box>
  <Box className="Command_Box_Calendar">
     Set Date: 
    <div>
    <FormControl sx = {{m: -5, ml: 15, width: "55%"}}>
      <TextField 
      value = {date}
      onChange = {event => setDate(event.target.value)}
      label = "Select Date"
      />
    </FormControl>
    </div>
  </Box>


  <Box  sx= {{textAlign: "center",
  marginBottom: "10px"
   }}

>
    <Button  sx = {{
    backgroundColor: colors.redAccent[500] ,
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    }} 
    onClick = {onClickedButton}
    >
      Select
    </Button>
  </Box>
    </Box>

  {/* COLUMNS 2 */}
  {/* <Box
     width = "100%"
     gridArea="c"
     height = "0vh"
     borderRight = {`10px solid ${colors.primary[400]}`}
     sx= {{textAlign: "center" }}     > 
        <Button
        sx = {{backgroundColor: colors.redAccent[500],
          color: colors.grey[100],
          padding: "0px 25px",
          //alignItems: "right",
          fontWeight: "bold",
          fontSize: "17px",
        }}
        onClick = {deleteOrder}
        >
          Delete Order
        </Button>

        <Button
        sx = {{backgroundColor: colors.greenAccent[500],
          color: colors.grey[100],
          padding: "30px 50px",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "17px",
        }}
        onClick = {sendRequest}
        >
          Generate Schedule
        </Button>
       </Box>
       */}
  
  </Box>    
  
)}
export default Calendar;