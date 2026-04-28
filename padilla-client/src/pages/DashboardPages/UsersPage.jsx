import React from "react";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
} from "@mui/material";

// ---------------- SAMPLE USERS DATA ----------------
const userRows = [
  { id: 1, name: "Juan Dela Cruz", role: "Admin", status: "Active" },
  { id: 2, name: "Maria Santos", role: "Staff", status: "Active" },
  { id: 3, name: "Pedro Reyes", role: "User", status: "Inactive" },
  { id: 4, name: "Anna Lopez", role: "User", status: "Active" },
  { id: 5, name: "John Cruz", role: "Staff", status: "Inactive" },
];

// ---------------- STATUS CELL RENDER ----------------
const statusColor = (status) =>
  status === "Active"
    ? "success"
    : "default";

// ---------------- COLUMNS ----------------
const columns = [
  { field: "id", headerName: "ID", width: 80 },

  {
    field: "name",
    headerName: "Full Name",
    flex: 1,
    minWidth: 180,
  },

  { field: "role", headerName: "Role", width: 140 },

  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => (
      <Chip
        label={params.value}
        size="small"
        color={statusColor(params.value)}
        variant="filled"
      />
    ),
  },
];

// ---------------- COMPONENT ----------------
function UsersPage() {
  const totalUsers = userRows.length;
  const activeUsers = userRows.filter((u) => u.status === "Active").length;
  const inactiveUsers = userRows.filter((u) => u.status === "Inactive").length;

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4f6f8 0%, #eef2f7 100%)",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          color: "white",
          background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          User Management
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Monitor system users, roles, and account activity in real-time.
        </Typography>
      </Box>

      {/* SUMMARY CARDS */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        {[
          { label: "Total Users", value: totalUsers },
          { label: "Active Users", value: activeUsers },
          { label: "Inactive Users", value: inactiveUsers },
        ].map((item, i) => (
          <Card
            key={i}
            sx={{
              flex: 1,
              borderRadius: 3,
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: 5,
              },
            }}
          >
            <CardContent>
              <Typography sx={{ color: "gray", fontSize: 13 }}>
                {item.label}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* TABLE SECTION */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            User Directory
          </Typography>
          <Divider sx={{ my: 2 }} />

          <Box sx={{ height: 420, width: "100%" }}>
            <DataGrid
              rows={userRows}
              columns={columns}
              pageSizeOptions={[5]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#f0f4ff",
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;