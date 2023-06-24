import { useState } from "react";
import { ProSidebarProvider, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Route, Routes } from "react-router-dom";
// import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to = {to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35x 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebarProvider collapsed={isCollapsed}>
        {/* <Menu iconShape="square"> */}
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "1px 0 1px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="15px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={'logo192.png'}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Huy Quoc Pham
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin
                </Typography>
              </Box>
            </Box>
          )}
                     {!isCollapsed && (

          <Box paddingLeft={isCollapsed ? undefined : "0%"}>
            <MenuItem
              title="Dasboard"
              // routerLink = {< Link to ="/dashboard" />}
              routerLink = {< Link to ="/" />}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >Home</MenuItem>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <MenuItem
              title=""
              routerLink = {< Link to ="/table" />}
              icon={<TableChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            > Table</MenuItem>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>

            <MenuItem
              title="Calendar"
              routerLink = {< Link to ="/calendar" />}

              icon={<CalendarMonthOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            >Calendar</MenuItem>
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography> */}
          </Box>
                     )}
                     {/* COLLAPSED */}
        {isCollapsed && (
           <Box>
           <MenuItem
             //routerLink = {< Link to ="/dashboard" />}
             routerLink = {< Link to ="/" />}
             icon={<HomeOutlinedIcon />}
             selected={selected}
             setSelected={setSelected}
           ></MenuItem>

           <Typography
             variant="h6"
             color={colors.grey[300]}
             sx={{ m: "15px 0 5px 20px" }}
           >
             Data
           </Typography>
           <MenuItem
             routerLink = {< Link to ="/table" />}
             icon={<TableChartOutlinedIcon />}
             selected={selected}
             setSelected={setSelected}
           />
           {/* <MenuItem
           routerLink = {<Link to = "/contacts"/>}
           icon={<ContactsOutlinedIcon />}
             selected={selected}
             setSelected={setSelected}
             /> */}
           <Typography
             variant="h6"
             color={colors.grey[300]}
             sx={{ m: "15px 0 5px 20px" }}
           >
             Pages
           </Typography>
           
           <MenuItem
             routerLink = {< Link to ="/calendar" />}
             icon={<CalendarMonthOutlinedIcon />}
             selected={selected}
             setSelected={setSelected}
           />
         </Box>
        )}
        </Menu>
        
      </ProSidebarProvider>
    </Box>
  );
};

export default Sidebar;