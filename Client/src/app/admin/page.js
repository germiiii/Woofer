"use client";

import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
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
    width: 160,
  },

  {
    field: "address",
    headerName: "Address",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 200,
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    sortable: false,
    renderCell: (params) => {
      return (
        <div className="action">
          <div className="view">View</div>
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

      <Box sx={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
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
        />
      </Box>
    </div>
  );
}
