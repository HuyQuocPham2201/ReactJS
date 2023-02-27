import {useContext, useState} from 'react';
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
    Button
} from "@mui/material";
import Header from '../../Components/Header';
import { tokens } from '../../theme';


const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState ([]);
   
    const [loadname, setLoadname] = useState('')
    const [loadamount, setLoadamount] = useState('')
    const [start_time, setStart_time] = useState('')
    const [start_point, setStart_point] = useState('')
    const [end_point, setEnd_point] = useState('')

    const onClickedButton = async (event) => {
        event.preventDefault()
        try {
          const send = await APIs.post("/orders/", {
             "load_name": loadname,
             "load_amount": loadamount,
             "start_time": start_time,
             "from_node": start_point,
             "to_node": end_point
          })
          console.log(send);
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
    return (
        <Box
        display = "grid"
        gridTemplateColumns="repeat(4, 1fr)"
        className = "layoutCalendar"
        backgroundColor = {colors.primary[400]}
        > 
        {/* <Header title = "CALENDAR" subtitle = "Full Calendar Interactive Page" /> */}

    <Box 
    width = "100%"
    gridArea="a"
    borderRight = {`10px solid ${colors.primary[500]}`}

    >
        <Box display = "flex" justifyContent = "space-between">
            {/* CALENDAR SIDEBAR */}
            <Box flex ="1 1 20%" 
             backgroundColor = {colors.primary[400]}
             p = "15px"
             borderRadius= "4px">
             <Typography variant='h5'>Events</Typography>
             <List>
                {currentEvents.map((event) => (
                    <ListItem 
                    key = {event.id}
                    sx = {{
                        backgroundColor: colors.greenAccent[500],
                        margin: "10px 0",
                        borderRadius: "2px"
    
                    }}> 
                    <ListItemText
                    primary = {event.title}
                    secondary = {
                        <Typography>
                            {formatDate(event.start, {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                        </Typography>
                    } 
                    />
                    </ListItem>
                        ))}
             </List>
            </Box>
            {/* CALENDAR */}
            <Box flex = "1 1 100%" ml = "15px">
                <FullCalendar 
                height= "75vh"
                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    listPlugin,
                ]}
                headerToolbar = {{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                }}
                intitialView = "dayGridMonth"
                editable = {true}
                selectable = {true}
                selectMirror = {true}
                dayMaxEvents = {true}
                select = {handleDateClick}
                eventClick = {handleEventClick}
                eventsSet = {(events) => setCurrentEvents(events)}
                initialEvents = {[
                    {id: "1234", 
                    title: "All-day event", 
                    date: "2022-09-14" },
                    {id: "4321", title: "Timed event", date: "2022-09-28" },
                ]}
                />
            </Box>
        </Box>
    </Box>
    <Box gridArea="b"
    overflow= "auto"
    >
         <Box
  className="Command_header_calendar"
  p = "5px"
  width = "100%"
  sx = {{textAlign: "left",
  fontSize: "x-large",
  fontWeight: "bold"
}}
  >
    Command.
  </Box>
  <Box
  className = "Command_Box_Calendar"
  >
    Load Name: 
    <div>
    <FormControl sx = {{m: -5, ml: 15, width: "55%" }}>
    {/* <InputLabel>Select Load Name </InputLabel> */}
    {/* <Select
    value = {loadname}
    onChange = {e => setLoadname(e.target.value)}
    >
     <MenuItem value = {10}>10</MenuItem>
     
    </Select> */}

    <TextField
    label = "Select Load Name"
    value = {loadname}
    onChange = {event => setLoadname(event.target.value)}
    />
 
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
    <TextField
    label ="Select Load Amount"
     value = {loadamount}
     onChange = {event => setLoadamount(event.target.value)}
    />
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

  <Box  sx= {{textAlign: "center"
   }}
>
    <Button  sx = {{
    backgroundColor: colors.redAccent[400] ,
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
    </Box>
    
)}
export default Calendar;