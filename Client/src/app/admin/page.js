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
  const api = process.env.NEXT_PUBLIC_APIURL;
  const columns = [
    { field: "id", headerName: "ID", width: 300, editable: false },
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
      editable: false,
    },
    {
      field: "username",
      headerName: "Username",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      width: 130,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 130,
      editable: true,
    },
    {
      field: "selectedType",
      headerName: "Type",
      width: 90,
      editable: true,
    },
    {
      field: "province",
      headerName: "Province",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 250,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 200,
      editable: false,
    },
    {
      field: "is_active",
      headerName: "Active",
      description: "This column has a value getter and is not sortable.",
      sortable: true,
      width: 150,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      sortable: false,
      renderCell: (params) => {
        const isAdminUser = params.row.email === "admin@woofer.com";
        if (isAdminUser) {
          return null;
        }
        return (
          <div className="action flex flex-col" style={actionContainer}>
            <button
              onClick={() => handleDeactivate(params.row.id)}
              className="w-30 px-4 py-1 rounded-full bg-[#29235c] text-[#F39200]"
            >
              Deactivate
            </button>
            <button
              onClick={() => handleActivate(params.row.id)}
              className="w-30 px-4 py-1 rounded-full bg-[#29235c] text-green-500 mt-1"
            >
              Activate
            </button>
          </div>
        );
      },
      editable: false,
    },
  ];
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const decodedToken = jwt.decode(token);
  const userId = decodedToken?.userId;
  const [users, setUsers] = React.useState([]);
  const [userRole, setUserRole] = React.useState(null);
  const [selectedType, setSelectedType] = React.useState(null);
  const [loadingRole, setLoadingRole] = React.useState(true);
  const actionContainer = {
    display: "flex",
    flexDirection: "column",
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${api}/users?role=admin`);
      setUsers(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchUserRole = async (userId) => {
    try {
      const response = await axios.get(`${api}/users/${userId}`);
      setUserRole(response.data.role);
      setSelectedType(localStorage.getItem("selectedType"));
    } catch (error) {
      console.error("Error fetching user role:", error);
    } finally {
      setLoadingRole(false);
    }
  };

  const handleActivate = async (userId) => {
    try {
      await axios.put(`${api}/activate/users/${userId}`);
      await fetchAllUsers();
    } catch (error) {
      console.error("Error activating user:", error);
    }
  };

  const handleDeactivate = async (userId) => {
    try {
      await axios.delete(`${api}/activate/users/${userId}`);
      await fetchAllUsers();
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport
          csvOptions={{
            fileName: "wooferUsers",
            delimiter: ";",
          }}
        />
      </GridToolbarContainer>
    );
  }

  React.useEffect(() => {
    fetchUserRole(userId);
  }, [token]);

  React.useEffect(() => {
    if (!loadingRole) {
      if (userRole !== "admin" && selectedType === "owner") {
        router.push("/ownerHome");
      } else if (userRole !== "admin" && selectedType === "walker") {
        router.push("/walkerHome");
      }
    }
  }, [userRole, loadingRole, router, selectedType]);

  React.useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div
        className="flex items-center bg-[#29235c]"
        style={{ minHeight: "100px" }}
      >
        <Link href={"/"}>
          <button
            className="ml-4 h-8 w-20 rounded-full bg-white text-[#29235c] hover:bg-[#F39200] transition-all duration-300 font-bold"
            onClick={handleLogout}
          >
            log out
          </button>
        </Link>
        <div className="flex-1 flex items-center justify-center">
          <h1
            style={{ fontFamily: "LikeEat" }}
            className="font-bold text-[#F39200] mb-3 text-6xl"
          >
            Woofer Panel
          </h1>
        </div>
      </div>
      <Box sx={{ height: "100%", width: "100%" }}>
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
          checkboxSelection={false}
          disableRowSelectionOnClick
          slots={{ toolbar: CustomToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          processRowUpdate={(updatedRow, originalRow) => {
            // Send the updated values to the server
            return axios
              .put(`${api}/editUser`, updatedRow)
              .then((response) => {
                // You can handle the server response if needed
                // console.log(response.data);
                return updatedRow; // Update the Data Grid internal state
              })
              .catch((error) => {
                // Handle errors appropriately
                console.error("Error updating row on the server:", error);
                // You may want to throw an error or return originalRow
                return originalRow; // Keep the original state in case of an error
              });
          }}
          onProcessRowUpdateError={(
            error,
            updatedRows,
            updatedRowsById,
            previousRowState,
            apiRef
          ) => {
            // Handle the error appropriately
            console.error("Error updating rows:", error);
          }}
        />
      </Box>
    </div>
  );
}
