
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { DataTeam } from "../../data/DataTeam";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../Components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        m="40px 0 0 0"
        height="75vh"
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
    </Box>
  );
};

export default Team;