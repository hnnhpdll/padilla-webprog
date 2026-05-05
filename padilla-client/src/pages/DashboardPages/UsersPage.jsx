import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";

import usersData from "../../data/users.json";

// ---------------- MAP JSON ----------------
const mappedUsers = usersData.map((user, index) => ({
  id: user.id ?? index + 1,
  firstName: user.firstName,
  lastName: user.lastName,
  age: user.age,
  gender: user.gender,
  contactNumber: user.contactNumber,
  email: user.email,
  role: user.role,
  username: user.username,
  address: user.address,
  status: user.isActive ? "Active" : "Inactive",
}));

function UsersPage() {
  const [users, setUsers] = React.useState(mappedUsers);
  const [open, setOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState(null);

  // ---------------- SEARCH / FILTER / SORT ----------------
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState({
    role: "",
    status: "",
  });
  const [sortBy, setSortBy] = React.useState("none");

  // ---------------- FORM ----------------
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    role: "",
    username: "",
    password: "",
    address: "",
    status: "Active",
  });

  const [errors, setErrors] = React.useState({});

  // ---------------- TOGGLE STATUS ----------------
  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Active" ? "Inactive" : "Active",
            }
          : u
      )
    );
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    let newErrors = {};

    if (!form.firstName) newErrors.firstName = "Required";
    if (!form.lastName) newErrors.lastName = "Required";

    if (!form.age || isNaN(form.age))
      newErrors.age = "Age must be a number";

    if (!form.contactNumber || !/^\+63\d{10}$/.test(form.contactNumber))
      newErrors.contactNumber = "Must start with +63 and 10 digits";

    if (!form.email) newErrors.email = "Email is required";

    if (!form.username) {
      newErrors.username = "Required";
    } else if (form.username.includes(" ")) {
      newErrors.username = "No spaces allowed";
    }

    if (!editingUser && (!form.password || form.password.length < 8)) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!form.role) newErrors.role = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- OPEN MODAL ----------------
  const handleOpen = (user = null) => {
    setEditingUser(user);

    setForm(
      user
        ? { ...user, password: "" }
        : {
            firstName: "",
            lastName: "",
            age: "",
            gender: "",
            contactNumber: "",
            email: "",
            role: "",
            username: "",
            password: "",
            address: "",
            status: "Active",
          }
    );

    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ---------------- SAVE ----------------
  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...form } : u
        )
      );
    } else {
      const newId =
        users.length > 0
          ? Math.max(...users.map((u) => u.id)) + 1
          : 1;

      setUsers((prev) => [...prev, { id: newId, ...form }]);
    }

    handleClose();
  };

  // ---------------- DELETE ----------------
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  // ---------------- SEARCH + FILTER + SORT ----------------
  const filteredUsers = users
    .filter((u) => {
      const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
      const searchValue = search.toLowerCase();

      const searchMatch =
        fullName.includes(searchValue) ||
        u.email?.toLowerCase().includes(searchValue) ||
        u.username?.toLowerCase().includes(searchValue);

      const roleMatch = filters.role ? u.role === filters.role : true;
      const statusMatch = filters.status ? u.status === filters.status : true;

      return searchMatch && roleMatch && statusMatch;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        );
      }

      if (sortBy === "age") {
        return Number(a.age) - Number(b.age);
      }

      if (sortBy === "role") {
        return a.role.localeCompare(b.role);
      }

      return 0;
    });

  // ---------------- COLUMNS ----------------
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 120 },

    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        const isActive = params.value === "Active";

        return (
          <Button
            size="small"
            variant="contained"
            color={isActive ? "success" : "error"}
            onClick={() => handleToggleStatus(params.row.id)}
          >
            {isActive ? "Active" : "Disabled"}
          </Button>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleOpen(params.row)}
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  // ---------------- UI ----------------
  return (
    <Box sx={{ p: 3, background: "#f4f6f8", minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        User Management
      </Typography>

      <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>
        Add User
      </Button>

      {/* SEARCH + FILTER + SORT */}
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <TextField
          select
          label="Role"
          value={filters.role}
          onChange={(e) =>
            setFilters((p) => ({ ...p, role: e.target.value }))
          }
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Engineer">Engineer</MenuItem>
          <MenuItem value="Architect">Architect</MenuItem>
          <MenuItem value="Designer">Designer</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(e) =>
            setFilters((p) => ({ ...p, status: e.target.value }))
          }
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <MenuItem value="none">None</MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="role">Role</MenuItem>
        </TextField>
      </Stack>

      <Card>
        <CardContent>
          <Box sx={{ height: 450 }}>
            <DataGrid rows={filteredUsers} columns={columns} />
          </Box>
        </CardContent>
      </Card>

      {/* MODAL (unchanged working version) */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {editingUser ? "Edit User" : "Add User"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              fullWidth
            />

            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              fullWidth
            />

            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <TextField
                label="Age"
                name="age"
                value={form.age}
                onChange={handleChange}
                error={!!errors.age}
                helperText={errors.age}
                fullWidth
              />

              <TextField
                label="Contact Number (+63XXXXXXXXXX)"
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                error={!!errors.contactNumber}
                helperText={errors.contactNumber}
                fullWidth
              />
            </Stack>

            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
            />

            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              fullWidth
            />

            {!editingUser && (
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
            )}

            <TextField
              select
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              error={!!errors.role}
              helperText={errors.role}
              fullWidth
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Engineer">Engineer</MenuItem>
              <MenuItem value="Architect">Architect</MenuItem>
              <MenuItem value="Designer">Designer</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage;