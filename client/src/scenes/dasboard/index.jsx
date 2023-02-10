import { Box, Button, FormControl,Select, IconButton, Typography, useTheme, InputLabel } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../Components/Header";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
import StatBox from "../../Components/StatBox";
import { useContext, useEffect } from "react";
import AGVContext from "../../context/AGVContext";
import APIs from "../../apis/APIs";
import { MenuItem } from "react-pro-sidebar";
import { AGVs } from "../../data/DatatDash";
import MultipleSelect from "../../Components/MultipleSelect";
import SelectBox from "../../Components/MultipleSelect";
import SelectAGVs from "../../Components/SelectAGVs";
import SelectStart from "../../Components/SelectStart";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {a, setA} = useContext(AGVContext);
  useEffect(() => {
   const fetchData = async () => {
    try {
    const response = await APIs.get("/")
    console.log(response)
    //  const b = response.data.data
    //  console.log(b)
    setA(response.data.data.AGV_data)
    } catch (err) {}
  }
   setInterval(async() => await fetchData(), 2000);
  },[])

  
  
  

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
          display="flex"
          alignItems="flex"
          justifyContent="center"
        >
          <Box sx = {{fontWeight: "bold", fontSize: "23px"}}>
           <div> 
        <DirectionsCarIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>
              &nbsp;
              AGV1 
              
            </div>
                <Box sx ={{fontWeight: "bold", 
                fontSize: "18px", 
                alignItems: "left",
                justifyContent: 'left'}}>

                {a.map((AGV) => {
                 return (
                  <Typography
                  >
                      <div>
                        Car ID: {AGV.car_id}
                        <br/>
                        Speed: {AGV.car_speed}
                           <br/>
                           Battery Capacity: {AGV.car_battery_capacity}
                           <br/>
                           Location: {AGV.previous_node}
                      </div>
                      </Typography>
                    )
                
                })}

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
        
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="AGV 2"
            subtitle="..."
            progress="0.50"
            increase="21%"
            icon={
              <DirectionsCarIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="AGV 3"
            subtitle="..."
            progress="0.30"
            increase="5%"
            icon={
              <DirectionsCarIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="AGV 4"
            subtitle="..."
            progress="0"
            increase="43%"
            icon={
              <DirectionsCarIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow = 'auto'
        >
          <img width = {925} height ={450} src = 'AGVpic.png'></img>
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
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box sx = {{fontWeight: "bold", fontSize: "20px"}}><div>Command.</div></Box>
            </Box>
            <Box className="Command_Box"  >
              AGVs: 
               {/* <MultipleSelect sx = {{ m: -2, ml: 8 , width: 200}}/> */}
               <SelectAGVs />
            </Box>
            <Box className="Command_Box">
              Starting Points: 
              <SelectStart title = "Select Starting Points"/>
            </Box>
            <Box className="Command_Box">
               Ending Points: 
               <SelectStart title = "Select Ending Points"/>
            </Box>
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
            }} >
              Select 
                        </Button>
               
            </Box>
        </Box>

        {/* ROW 3 */}
       
      </Box>
    </Box>
  );
};


export default Dashboard;