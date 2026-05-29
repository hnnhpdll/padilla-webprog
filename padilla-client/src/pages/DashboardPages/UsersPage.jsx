import React, { useEffect } from "react";
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

import axios from "axios";

function UsersPage() {
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [errors, setErrors] = React.useState({});

  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    age: "",
    gender: "",
    contactNumber: "+639",
    address: "",
    email: "",
    password: "",
    type: "viewer",
  });

  // ---------------- FETCH USERS ----------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(
          res.data.users.map((user) => ({
            id: user._id,
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            role: user.type || "N/A",
            status: user.isActive ? "Active" : "Disabled", // ✅ UPDATED
          }))
        );
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUsers();
  }, []);

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    let newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "Required";
    if (!form.lastName.trim()) newErrors.lastName = "Required";

    if (!form.username.trim()) {
      newErrors.username = "Required";
    } else if (form.username.includes(" ")) {
      newErrors.username = "No spaces allowed";
    }

    if (!form.age || isNaN(form.age)) {
      newErrors.age = "Age must be a number";
    }

    if (!form.gender) newErrors.gender = "Required";

    if (!form.contactNumber || !/^\+639\d{9}$/.test(form.contactNumber)) {
      newErrors.contactNumber = "Invalid PH number";
    }

    if (!form.address.trim()) newErrors.address = "Required";
    if (!form.email.trim()) newErrors.email = "Required";

    if (!editingUser && (!form.password || form.password.length < 8)) {
      newErrors.password = "Min 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- TOGGLE STATUS ----------------
  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: u.status === "Active" ? "Disabled" : "Active",
            }
          : u
      )
    );
  };

  // ---------------- DELETE USER ----------------
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };

  // ---------------- MODAL ----------------
  const handleOpen = (user = null) => {
    setEditingUser(user);

    setForm(
      user
        ? { ...user, password: "" }
        : {
            firstName: "",
            lastName: "",
            username: "",
            age: "",
            gender: "",
            contactNumber: "+639",
            address: "",
            email: "",
            password: "",
            type: "viewer",
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
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...form,
        age: Number(form.age),
      };

      if (editingUser) {
        await axios.put(
          `http://localhost:8000/api/users/${editingUser.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://localhost:8000/api/users", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const res = await axios.get("http://localhost:8000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(
        res.data.users.map((user) => ({
          id: user._id,
          userId: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          role: user.type || "N/A",
          status: user.isActive ? "Active" : "Disabled",
        }))
      );

      handleClose();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ---------------- FILTER ----------------
  const filteredUsers = users.filter((u) => {
    const s = search.toLowerCase();
    return (
      `${u.firstName} ${u.lastName}`.toLowerCase().includes(s) ||
      u.email?.toLowerCase().includes(s) ||
      u.username?.toLowerCase().includes(s)
    );
  });

  // ---------------- COLUMNS ----------------
  const columns = [
    { field: "userId", headerName: "User ID", width: 220 },
    { field: "firstName", headerName: "First Name", width: 140 },
    { field: "lastName", headerName: "Last Name", width: 140 },
    { field: "username", headerName: "Username", width: 140 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 120 },

    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color={params.value === "Active" ? "success" : "error"}
          onClick={() => handleToggleStatus(params.row.id)}
        >
          {params.value}
        </Button>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button size="small" onClick={() => handleOpen(params.row)}>
            Edit
          </Button>

          <Button
            size="small"
            color="error"
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">User Management</Typography>

      <Button sx={{ mt: 2 }} variant="contained" onClick={() => handleOpen()}>
        Add User
      </Button>

      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Box sx={{ height: 450 }}>
            <DataGrid rows={filteredUsers} columns={columns} />
          </Box>
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editingUser ? "Edit User" : "Add User"}</DialogTitle>

        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField name="firstName" label="First Name" onChange={handleChange} error={!!errors.firstName} helperText={errors.firstName} />
            <TextField name="lastName" label="Last Name" onChange={handleChange} error={!!errors.lastName} helperText={errors.lastName} />
            <TextField name="username" label="Username" onChange={handleChange} error={!!errors.username} helperText={errors.username} />
            <TextField name="age" label="Age" type="number" onChange={handleChange} error={!!errors.age} helperText={errors.age} />

            <TextField
              select
              name="gender"
              label="Gender"
              value={form.gender}
              onChange={handleChange}
              error={!!errors.gender}
              helperText={errors.gender}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </TextField>

            <TextField
              name="contactNumber"
              label="Contact Number"
              value={form.contactNumber}
              onChange={(e) => {
                let value = e.target.value;
                if (!value.startsWith("+639")) value = "+639";
                const digitsOnly = "+639" + value.slice(4).replace(/\D/g, "");
                setForm((prev) => ({
                  ...prev,
                  contactNumber: digitsOnly.slice(0, 13),
                }));
              }}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber}
            />

            <TextField name="address" label="Address" onChange={handleChange} error={!!errors.address} helperText={errors.address} />
            <TextField name="email" label="Email" type="email" onChange={handleChange} error={!!errors.email} helperText={errors.email} />
            <TextField name="password" label="Password" type="password" onChange={handleChange} error={!!errors.password} helperText={errors.password} />

            <TextField select name="type" label="Role" value={form.type} onChange={handleChange}>
              <MenuItem value="viewer">Viewer</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default UsersPage; 