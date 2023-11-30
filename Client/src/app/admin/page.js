"use client";

import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "image",
    headerName: "Image",
    width: 140,
    renderCell: (params) => {
      return (
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            src={params.row.image}
            alt={`Image ${params.row.username}`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Username",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
    editable: true,
  },
  {
    field: "isOwner",
    headerName: "Is Owner",
    width: 110,
    editable: true,
  },
  {
    field: "isWalker",
    headerName: "Is Walker",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 110,
  },

  {
    field: "address",
    headerName: "Address",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="delete">Delete</div>
        </div>
      );
    },
  },
];

export default function DataGridDemo() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users");
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(users);

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "30px", margin: "20px 0" }}>
        Woofer Panel
      </div>

      <Box sx={{ height: 850, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          rowHeight={130}
          initialState={{
            pagination: {
              paginationModel: {
                ptypeSize: 5,
              },
            },
          }}
          ptypeSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </div>
  );
}
