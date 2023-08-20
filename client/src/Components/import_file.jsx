import React, { useState } from 'react';
import Papa from 'papaparse';
import { Box, Button, useTheme } from '@mui/material';
import APIs from '../apis/APIs';
import { tokens } from '../theme';

function CSVtoJSONConverter() {
  const [jsonData, setJsonData] = useState({});
  const theme = useTheme();
  const colors = tokens (theme.palette.mode);
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];  //receive CSV file
    Papa.parse(file, {
      header: true,
      skipEmptyLines: 'trailing',
      complete: (results) => {   //convert file CSV to JSON
      const jsonData_1 = results.data;
      setJsonData(jsonData_1);
      console.log(jsonData_1);
      console.log(jsonData);
      }
      },
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // const send = await APIs.post("/api/orders/", jsonData)
      const send = await APIs.post("/ManageRequests/sendOrders/", jsonData)
      console.log (send); 
    }
    catch (err)
    {}
  }
 

  return (
    <div>
      {/* {jsonData && (
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      )} */}
      <Box 
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
            }} 
           onClick = {handleSubmit}
            >
              Send File CSV
            </Button>
               
            </Box>
    </div>
  );
}

export default CSVtoJSONConverter;
