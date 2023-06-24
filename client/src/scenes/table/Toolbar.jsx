import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';

export default function CustomToolbar() {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarColumnsButton /> */}
      <GridToolbarFilterButton />
      {/* <GridToolbarDensitySelector /> */}
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

