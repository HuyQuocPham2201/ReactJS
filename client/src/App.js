import { useContext, useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dasboard";
import {Routes, Route} from "react-router-dom";
import Team from "./scenes/table";
// import Map from "./scenes/map";
// import Bar from "./scenes/bar";
import Calendar from "./scenes/calendar";
// import FAQ from "./scenes/faq";
import { AGVProvider } from "./context/AGVContextDash";
import Table from "./scenes/table";
import { AGVProvider_table } from "./context/AGVContextTable";
function App() {
  const [theme,colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  
  return ( <ColorModeContext.Provider value = {colorMode}>
    <ThemeProvider theme = {theme}>
      <CssBaseline />
    <div className="app">
      <Sidebar  isSidebar={isSidebar} />
      <main className = "content">
        <Topbar/>
        <AGVProvider>
          <AGVProvider_table>
        <Routes>
          < Route path = "/" element = {<Dashboard />}/>
          < Route path = "/table" element = {<Table />} /> 
          < Route path = "/calendar" element = {<Calendar/>} />
          {/* < Route path = "/map" element = {<Map/>} />
          < Route path = "/bar" element = {<Bar/>} />
          < Route path = "/faq" element = {<FAQ/>} /> */}
        </Routes>
        </AGVProvider_table>
         </AGVProvider>


      </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
