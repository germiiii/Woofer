"use client";

import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function DataGridDemo() {
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
              width: "70px",
              height: "70px",
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
      field: "is_active",
      headerName: "Active",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="action" style={actionContainer}>
            <button onClick={() => handleDeactivate(params.row.id)}>
              Deactivate
            </button>
            <button onClick={() => handleActivate(params.row.id)}>
              Activate
            </button>
          </div>
        );
      },
    },
  ];
  const [users, setUsers] = React.useState([]);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/users?role=admin"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleActivate = async (userId) => {
    try {
      await axios.put(`http://localhost:3001/activate/users/${userId}`);
      await fetchAllUsers();
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await axios.delete(`http://localhost:3001/activate/users/${userId}`);
      await fetchAllUsers();
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };

  const actionContainer = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div>
      <div style={{ textAlign: "center", fontSize: "30px", margin: "20px 0" }}>
        Woofer Panel
      </div>

      <Box sx={{ height: 850, width: "100%" }}>
        <DataGrid
          rows={users}
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
