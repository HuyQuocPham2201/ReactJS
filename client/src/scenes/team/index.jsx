
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { DataTeam } from "../../data/DataTeam";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/Header";
import { useState, useEffect, useContext } from "react";
import APIs from "../../apis/APIs";
import { AGVContext } from "../../context/AGVContext";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {a1, setA1} = useContext(AGVContext);
  useEffect(() => {
   const fetchData = async () => {
    try {
    const response = await APIs.get("/team")
    console.log(response)
    //  const b = response.data.data
    //  console.log(b)
    setA1(response.data.data.AGV_data_1)
    console.log(a1)
    } catch (err) {}
  }
   setInterval(async() => await fetchData(), 2000);
  },[])


  const columns = [
    {field: "id", headerName: "ID"},
    { field: "Order", headerName: "Order" },
    {
      field: "LoadName",
      headerName: "Load Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Number",
      headerName: "Number",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
        field: "Weight",
        headerName: "Weight",
        type: "number",
        headerAlign: "center",
        align: "center",
      },
    {
      field: "StartTime",
      headerName: "Start Time",
      flex: 1,
    },
    {
      field: "Inbound",
      headerName: "Inbound",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
        field: "Outbound",
        headerName: "Outbound",
        flex: 1,
        headerAlign: "center",
        align: "center",
      },
  ];

  return (

    <Box m="20px">
      <Header title="TABLE" subtitle="" />
      <Box 
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px">
        {/* Columns 1 */}
      <Box gridColumn= "span 4"
      gridRow = "span 4"
       backgroundColor={colors.primary[400]}
       overflow="auto"
       borderBottom={`4px solid ${colors.primary[500]}`}
       >

          {/* Row 1 & 2*/}
        <Box 
        display="grid"
        gridColumn= "span 4"
        p ="100px"
        gap = "10px"
        gridTemplateColumns="repeat(12, 1fr)"
       backgroundColor={colors.primary[400]}
       overflow="auto"
       borderBottom={`4px solid ${colors.primary[500]}`}>
        <Box gridColumn= "span 6" 
        backgroundColor={colors.primary[400]}
        borderRight={`4px solid ${colors.primary[500]}`}

> AGV</Box>
        <Box gridColumn= "span 6"> AGV</Box>
      </Box>
        <Box gridColumn= "span 4"
       gridRow = "span 5"
       p = "100px"
       backgroundColor={colors.primary[400]}
       overflow="auto"
       borderBottom={`4px solid ${colors.primary[500]}`}>   
        </Box>
        <Box>
          AGV
        </Box>

      </Box>
      {/* Columns 2 */}
      <Box
      backgroundColor={colors.primary[400]}
      overflow="auto"
      gridRow = "span 4"
        gridColumn= "span 4"
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
        }}
      >
        <DataGrid  rows={DataTeam} columns={columns} components = {{Toolbar: GridToolbar}} />
      </Box>
      <Box gridColumn= "span 4"
            gridRow = "span 4"
            backgroundColor={colors.primary[400]}

            >
        AGV
      </Box>
      </Box>
    </Box>
  );
//   return (
//   <table className="table container" >
//   <thead>
//     <tr className = 'bg-danger'>
//       <th scope="col">Car Id</th>
//       <th scope="col">Battery</th>
//       <th scope="col">Last</th>
//       <th scope="col">Handle</th>
//       <th scope="col">Handle</th>
//       <th scope="col">Handle</th>

//     </tr>
//   </thead>
//   <tbody className = 'bg-primary'>
//     <tr>
//       <th scope="row">1</th>
//       <td>Mark</td>
//       <td>Otto</td>
//       <td>@mdo</td>
//     </tr>
//     <tr>
//       <th scope="row">2</th>
//       <td>Jacob</td>
//       <td>Thornton</td>
//       <td>@fat</td>
//     </tr>
//     <tr>
//       <th scope="row">3</th>
//       <td colSpan="2">Larry the Bird</td>
//       <td>@twitter</td>
//     </tr>
//   </tbody>
// </table>
//   )
};

export default Team;
