import { useContext, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dasboard";
import {Routes, Route, Router, BrowserRouter, Switch} from "react-router-dom";
import Team from "./scenes/table";
// import Map from "./scenes/map";
// import Bar from "./scenes/bar";
import Calendar from "./scenes/calendar";
// import FAQ from "./scenes/faq";
import { AGVProvider } from "./context/AGVContextDash";
import Table from "./scenes/table";
import { AGVProvider_table } from "./context/AGVContextTable";
import SignIn from "./sign_in/SignIn";
import SignUp from "./sign_up/SignUp";
import { AGVContext_auth} from "./context/AGVAuth";
import Schedule_table from "./scenes/Schedule";
import Material from "./scenes/Material";
import { setAuthToken } from "./Components/setAuthToken";

function App() {
  const [theme,colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [currForm, setCurrForm] = useState('login');
  //const {success, setSuccess} = useContext(AGVContext_auth)
  const [auth, setAuth ] = useState ({"logged": true})
  const token = localStorage.getItem("token");
  if (token)
  {
    setAuthToken(token);
  }


  return ( 
    <AGVContext_auth.Provider value = {{auth, setAuth}}>
  <ColorModeContext.Provider value = {colorMode}>
    <ThemeProvider theme = {theme}>
      <CssBaseline />
      <>{auth.logged ? (
        // <SignIn/>
        <Routes>
        < Route path = "/" element = {<SignIn/>} />
        < Route path= "/signup" element = {<SignUp/>} />

        </Routes>
          ) : (
          <div className="app">
      {/* {currForm === "login" ? <Login/> : <Register/> } */}
      <Sidebar  isSidebar={isSidebar} /> 
      <main className = "content">
      <Topbar/>
        <AGVProvider>
          <AGVProvider_table>
        <Routes>
          <Route path = "/" element = {<Dashboard/>} />
          < Route path = "/table" element = {<Table />} /> 
          < Route path = "/calendar" element = {<Calendar/>} />
          <Route path = "/schedule" element = {<Schedule_table/>} />
          <Route path = "/material" element ={<Material/>} />

          {/* < Route path = "/login" element = {<SignIn/>} />
          < Route path = "/signup" element = {<SignUp/>} /> */}

          {/* < Route path = "/map" element = {<Map/>} />
          < Route path = "/bar" element = {<Bar/>} />
          < Route path = "/faq" element = {<FAQ/>} /> */}
        </Routes>
        </AGVProvider_table>
         </AGVProvider>
      </main>
    </div>
    )} </>
    </ThemeProvider>
    </ColorModeContext.Provider>
    </AGVContext_auth.Provider>
  );
}

export default App;
