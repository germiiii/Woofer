"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import jwt from "jsonwebtoken";
import * as React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarExportContainer,
  GridCsvExportMenuItem,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  useGridApiContext,
  gridFilteredSortedRowIdsSelector,
  gridVisibleColumnFieldsSelector,
  GridCellEditStopParams,
  MuiEvent,
} from "@mui/x-data-grid";
import Navbar from "../Components/NavBar";
import "tailwindcss/tailwind.css";
import "../stylesLanding.css";
import Link from "next/link.js";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

export default function DataGridDemo() {
  const [walks, setWalks] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_APIURL;
        const response = await axios.get(
          `${API}/walk/walker/66609a55-b58d-48bf-8c46-3acffb573e17`
        );
        const walkss = response.data.walksFromWalker;
        console.log(walkss);
        setWalks(walkss);
      } catch (error) {
        console.error("Error al obtener los datos de la caminata:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      field: "owner.name",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
    },
    {
      field: "dogNumber",
      headerName: "Dog Number",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "duration",
      headerName: "Duration",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "totalPrice",
      headerName: "Price",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "state",
      headerName: "Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "actions",
      headerName: "Actions",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center bg-[#29235c]"
        style={{ minHeight: "100px" }}
      ></div>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={walks}
          columns={columns}
          rowHeight={90}
          initialState={{
            pagination: {
              paginationModel: {
                ptypeSize: 5,
              },
            },
          }}
          ptypeSizeOptions={[5]}
          checkboxSelection={false}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
