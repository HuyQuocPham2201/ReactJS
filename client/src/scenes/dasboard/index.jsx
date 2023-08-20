import { Box, Button, FormControl,Select, IconButton, Typography, useTheme, InputLabel, Option, MenuItem, TextField } from "@mui/material";
import { tokens } from "../../theme";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useContext, useEffect, useState } from "react";
import AGVContext from "../../context/AGVContextDash";
import APIs from "../../apis/APIs";
import { AGVs, EndPoints, LoadAmount, LoadName, LoadWeight } from "../../data/DatatDash";
import { w3cwebsocket as W3CwebSocket } from "websocket";
import { StartPoints } from "../../data/DatatDash";


 const client = new W3CwebSocket("ws://100.88.184.54:8000/ws/agvdata")
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {a, setA} = useContext(AGVContext);
  const [load_name, setLoad_name] = useState('')
  const [start_time, setStart_time] = useState('')
  const [load_amount, setLoad_amount] = useState('')
  const [load_weight, setLoad_weight] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [coloredAGV1, setColoredAGV1] = useState('')
  const [coloredAGV2, setColoredAGV2] = useState('')
  const [coloredAGV3, setColoredAGV3] = useState('')
  const [coloredAGV4, setColoredAGV4] = useState('')
  const [file, setFile] = useState()
  const [schedule, setSchedule] = useState()


  client.onopen = () => {
    console.log('Connected');
}


client.onmessage = (message) => {
const dataFromServer = JSON.parse(message.data)
setA(dataFromServer)
console.log(a)
}

const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const send = await APIs.post("/api/orders/", {
          "load_name": load_name,
          "load_amount": load_amount,
          // "load_weight": load_weight,
          "start_time": start_time,
          "from_node": start,
          "to_node": end,
        })
        console.log(send);


      } catch (err) {}
    }
    useEffect(() => {
      {a.map(AGV1 => {
        if (AGV1.fields.car_id == 0) {
          if (AGV1.fields.car_battery_capacity <= '30') {
            
            setColoredAGV1(colors.redAccent[600])
        // } else if ('20' < AGV1.fields.car_battery_capacity <= '50') {
        //   setColoredAGV1(colors.redAccent[300]) }
        } else {
          setColoredAGV1(colors.greenAccent[400])
        }
      }})}
    }, [])

    useEffect(() => {
      {a.map(AGV2 => {
        if (AGV2.fields.car_id == 1) {
          if(AGV2.fields.car_battery_capacity <= '30') {
            setColoredAGV2(colors.redAccent[600])
          // } else if ('20' < AGV2.fields.car_battery_capacity < '50') {
          //   setColoredAGV2(colors.redAccent[300])
          // // } else {
          } else  {
            setColoredAGV2(colors.greenAccent[400])
          }
        }
      }

    )}
    })
    useEffect(() => {
      {a.map(AGV3 => {
        if (AGV3.fields.car_id == 2) {
          if(AGV3.fields.car_battery_capacity < '30') {
            setColoredAGV3(colors.redAccent[600])
          // } else if ('20' <= AGV3.fields.car_battery_capacity <= '50') {
          //   setColoredAGV3(colors.redAccent[300]) }
          } else {
            setColoredAGV3(colors.greenAccent[400])
          }
        }
      }

    )}
    })
    useEffect(() => {
      {a.map(AGV4 => {
        if (AGV4.fields.car_id == 3) {
          if(AGV4.fields.car_battery_capacity < '30') {
            setColoredAGV4(colors.redAccent[600])
          // } else if ('20' <= AGV4.fields.car_battery_capacity <= '50') {
          //   setColoredAGV4(colors.redAccent[300]) }
          } else {
            setColoredAGV4(colors.greenAccent[400])
          }
        }
      }

    )}
    })
  return (
    <Box m="20px">

      {/* HEADER */}
      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HOME" subtitle="Welcome to your HOME" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box> */}

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          // display="flex"
          // alignItems="flex"
        >
          <Box 
          color = {coloredAGV1}
        sx ={{  
          textAlign: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "x-large"
        }}
          >
            
                     <DirectionsCarIcon
              sx={{ fontSize: "27px"}}/>
              &nbsp;
              AGV 1

              
                <Box sx ={{fontWeight: "bold", 
                fontSize: "18px", 
                }}
                display="flex"
          alignItems="flex"
          justifyContent="left"
                >

                {/* <Typography color = {colors.greenAccent[600]}> */}
                  <Typography className = "AGVtable"
                  fontSize = "medium"
                  fontWeight= "bold"
                  ml = "20px"
                  component={'span'}

                  >
                    {a.map(AGV => {
                      if (AGV.fields.car_id == 0) {
                        const DataAGV0 = AGV.fields
                        return (
                          <div key = {DataAGV0.car_id}>
                           Car ID: {DataAGV0.car_id}
                           <br/>
                           Car Speed: {DataAGV0.car_speed}
                          <br/>
                          Battery Capacity: {DataAGV0.car_battery_capacity}
                           <br/>
                          Location: {DataAGV0.previous_node}
                          </div>
                        )
                      } 
                      
                      })}
                
                                      
                     
                  
                </Typography>

                </Box>

                {/* {a.filter((AGV) => {
                  for(let i = 0; i < a.length; i++) {
                    AGV.data_id === i
                  }
                }).map((AGV) => {
                  return (
                    <div>{AGV.car_id}</div>
                  )
                } )} */}
                      {/* {a.filter((AGV)=> AGV.data_id === 1000).map((AGV) => {
                    return(<div>{AGV.car_speed}</div>) })} */}
        </Box>
        </Box>
        {/* AGV Box 2 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box color = {coloredAGV2}
          sx ={{ 
          textAlign: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "x-large"
        }}
          >
                     <DirectionsCarIcon
              sx={{ fontSize: "27px"}}/>
              &nbsp;
              AGV 2
              <Box sx ={{fontWeight: "bold", 
                fontSize: "18px", 
                }}
                display="flex"
                alignItems="flex"
                justifyContent="left"
                >
                  <Typography className = "AGVtable"
                  fontSize = "medium"
                  fontWeight= "bold"
                  ml = "20px"
                  component={'span'}
                  >
                                      
                      {a.map(AGV => {
                      if (AGV.fields.car_id == 1) {
                        const DataAGV0 = AGV.fields
                        return (
                          <div key = {DataAGV0.car_id}>
                           Car ID: {DataAGV0.car_id}
                           <br/>
                           Car Speed: {DataAGV0.car_speed}
                          <br/>
                          Battery Capacity: {DataAGV0.car_battery_capacity}
                           <br/>
                          Location: {DataAGV0.previous_node}
                          </div>
                        )
                      } 
                      
                      })} 
                    
                </Typography>

                </Box>
            </Box>
        </Box>

        {/* AGV BOX 3 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box color = {coloredAGV3}
          sx ={{
          textAlign: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "x-large"
        }}
          >
                     <DirectionsCarIcon
              sx={{ fontSize: "27px"}}/>
              &nbsp;
              AGV 3
              <Box sx ={{fontWeight: "bold", 
                fontSize: "18px", 
                }}
                display="flex"
                alignItems="flex"
                justifyContent="left"
                >
                  <Typography className= "AGVtable"
                  fontSize = "medium"
                  fontWeight= "bold"
                  ml = "20px"
                  component={'span'}
                  >
                    {a.map(AGV => {
                      if (AGV.fields.car_id == 2) {
                        const DataAGV0 = AGV.fields
                        return (
                          <div key = {DataAGV0.car_id}>
                           Car ID: {DataAGV0.car_id}
                           <br/>
                           Car Speed: {DataAGV0.car_speed}
                          <br/>
                          Battery Capacity: {DataAGV0.car_battery_capacity}
                           <br/>
                          Location: {DataAGV0.previous_node}
                          </div>
                        )
                      } 
                      
                      })}
                </Typography>

                </Box>
            </Box>
        </Box>

        {/* AGV BOX 4 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box color = {coloredAGV4}
          sx ={{
          textAlign: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "x-large"
        }}
          >
                     <DirectionsCarIcon
              sx={{ fontSize: "27px"}}/>
              &nbsp;
              AGV 4
              <Box sx ={{fontWeight: "bold", 
                fontSize: "18px", 
                }}
                display="flex"
                alignItems="flex"
                justifyContent="left"
                >
                  <Typography className = "AGVtable"
                  fontSize = "medium"
                  fontWeight= "bold"
                  ml = "20px"
                  component={'span'}

                  >
                                      
                       {a.map(AGV => {
                      if (AGV.fields.car_id == 3) {
                        const DataAGV0 = AGV.fields
                        return (
                          <div key = {DataAGV0.car_id} >
                           Car ID: {DataAGV0.car_id}
                           <br/>
                           Speed: {DataAGV0.car_speed}
                          <br/>
                          Battery Capacity: {DataAGV0.car_battery_capacity}
                           <br/>
                          Location: {DataAGV0.previous_node}
                          </div>
                        )
                      } 
                      
                      })}
                  
                </Typography>

                </Box>
            </Box>
        </Box>
        
        
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow = 'auto'
        >
          <img width="100%" height ="100%" src = 'map_real.svg'></img>

        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          {/* <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              ...
            </Typography>
          </Box> */}
            <Box
              display="flex"
              justifyContent="space-between"
              backgroundColor = {colors.greenAccent[400]}
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[400]}`}
              p="15px"
            >
              <Box sx = {{fontWeight: "bold", fontSize: "20px"}}><div>Command.</div></Box>
            </Box>
            <Box className="Command_Box" 
            sx = {{mt: "20px"}}
            >
              Load Name: 
              <div>
        <FormControl sx = {{m: -5, ml: 18, width: 250 }}>
            <InputLabel>Select Load Name </InputLabel>
            <Select
            value={load_name}
            label = "setLoad_name"
            onChange = {event => setLoad_name(event.target.value)}
            >
                {LoadName.map((load_name) => (
                    <MenuItem
                    key={load_name}
                    value = {load_name}
                    >
                    {load_name}</MenuItem>
                ))}
                

            </Select>
        </FormControl>
        </div>
               
            </Box>
            <Box className="Command_Box">
              Load Amount: 
              <div>
        <FormControl sx = {{m: -5,ml: 18, width: 250 }}>
            <InputLabel>Load Amount</InputLabel>
            <Select
            value={load_amount}
            label = "setLoad_amount"
            onChange = {event => setLoad_amount(event.target.value)}
            >
                {LoadAmount.map((load_amount) => (
                    <MenuItem
                    key={load_amount}
                    value = {load_amount}
                    >
                    {load_amount}</MenuItem>
                ))}
             </Select>
            </FormControl>
            {/* <FormControl sx = {{m:-8.4, ml:34, width: 121 }}>
            <InputLabel>Load Weight</InputLabel>
            <Select
            value={load_weight}
            label = "setLoad_weight"
            onChange = {event => setLoad_weight(event.target.value)}
            >
                {LoadWeight.map((load_weight) => (
                    <MenuItem
                    key={load_weight}
                    value = {load_weight}
                    >
                    {load_weight}</MenuItem>
                ))}
                

            </Select>
        </FormControl> */}
        </div>
            </Box>
            <Box className="Command_Box"
            >
              Starting Time: 
              <div>
        <FormControl sx = {{m: -5, ml: 18, width: 250 }}>
            <TextField 
            label = "Select Starting Time"
            value={start_time}
            onChange = {event => setStart_time(event.target.value)}

            />
           {/* <LocalizationProvider>
           <TimeField
            label = "Format with seconds"
            value = {start_time}
            onChange ={(event) => setStart_time(event)}
            format = "HH:mm:ss"
            >
              </TimeField>
           </LocalizationProvider> */}
        </FormControl>
        </div>

            </Box>
            <Box className="Command_Box">
               Starting Points: 
               <div>
        <FormControl sx = {{m: -5, ml: 18, width: 250 }}>
            <InputLabel>Select Starting Points</InputLabel>
            <Select
            value={start}
            label = "setStart"
            onChange = {event => setStart(event.target.value)}
            >
                {StartPoints.map((start) => (
                    <MenuItem
                    key={start}
                    value = {start}
                    >
                    {start}</MenuItem>
                ))}
                

            </Select>
        </FormControl>
        </div>
            </Box>
            <Box className="Command_Box">
               Ending Points: 
               <div>
        <FormControl sx = {{m: -5, ml: 18, width: 250 }}>
            <InputLabel>Select Ending Points</InputLabel>
            <Select
            value={end}
            label = "setEnd"
            onChange = {event => setEnd(event.target.value)}
            >
                {EndPoints.map((a) => (
                    <MenuItem
                    key={a}
                    value = {a}
                    >
                    {a}</MenuItem>
                ))}
                

            </Select>
        </FormControl>
        </div>
            </Box>
            {/* <Box>
              Import Files: 
              <FormControl>
                <Select
                  value = {file}
                  id = {"csvFileInput"}
                  accept = {".csv"}
                  onChange = {handleOnChange}
                >
                </Select>
              </FormControl>
            </Box> */}           
            <Box 
            display="flex"
            alignItems="flex"
            justifyContent="center"> 
              <Button sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }} 
           onClick = {handleSubmit}
            >
              Select 
            </Button>
            </Box>
            {/* <Box 
            display="flex"
            alignItems="flex"
            justifyContent="left"
            className= "choose_file"
            >
            <input type="file" onChange={handleFileChange} 
            
            /> 
              <Button sx={{
              backgroundColor: colors.redAccent[500],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              //padding: "0px 8px"
              alignItems: "right",
            }} 
           onClick = {handleSubmit_order}
            >
              Send File CSV
            </Button>
               
            </Box> */}
        </Box>

        {/* ROW 3 */}
      
      </Box>
    </Box>
  );
};


export default Dashboard;