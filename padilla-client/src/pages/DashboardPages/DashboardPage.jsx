import React, { useState } from "react";

import { BarChart, PieChart, Gauge } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";

import {
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  Drawer,
  Stack,
} from "@mui/material";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ---------------- DATA ----------------
const rows = [
  { id: 1, name: "Leisure Zone", status: "Active", progress: 70 },
  { id: 2, name: "CBD Expansion", status: "Planning", progress: 40 },
  { id: 3, name: "Residential District", status: "Active", progress: 85 },
  { id: 4, name: "Government Hub", status: "Construction", progress: 55 },
];

const projectZones = [
  {
    id: 1,
    name: "Subic Leisure & Playzone",
    status: "Active Development",
    progress: 70,
    description:
      "A mixed-use leisure and tourism hub designed for recreation and entertainment infrastructure.",
    position: [14.604253, 120.994314],
  },
  {
    id: 2,
    name: "Central Business District",
    status: "Planning Phase",
    progress: 40,
    description:
      "Financial core district for commercial buildings, offices, and economic expansion.",
    position: [14.5995, 120.9842],
  },
  {
    id: 3,
    name: "Airport Expansion Zone",
    status: "Construction",
    progress: 55,
    description:
      "Transportation and logistics hub designed for regional connectivity and air traffic expansion.",
    position: [14.5086, 121.0194],
  },
];

// ---------------- COMPONENT ----------------
export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  const avgProgress =
    rows.reduce((sum, r) => sum + r.progress, 0) / rows.length;

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
          Smart Urban Planning Dashboard
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Architecture-inspired GIS dashboard for Subic development zones.
        </Typography>
      </Box>

      {/* BENTO GRID */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 2,
        }}
      >
        {/* MAP */}
        <Card
          sx={{
            gridColumn: "span 12",
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Project Zone Map
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ height: 450, position: "relative" }}>
              {/* Map hint overlay */}
              <Box
                sx={{
                  position: "absolute",
                  zIndex: 1000,
                  top: 10,
                  left: 10,
                  background: "rgba(0,0,0,0.6)",
                  color: "white",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  fontSize: 12,
                }}
              >
                Click markers to view project details
              </Box>

              <MapContainer
                center={[14.604253, 120.994314]}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {projectZones.map((zone) => (
                  <Marker
                    key={zone.id}
                    position={zone.position}
                    eventHandlers={{
                      click: () => setSelectedProject(zone),
                    }}
                  >
                    <Popup>{zone.name}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Box>
          </CardContent>
        </Card>

        {/* KPI CARDS */}
        {[
          { label: "Total Zones", value: rows.length },
          { label: "Avg Progress", value: `${avgProgress.toFixed(0)}%` },
          { label: "Infrastructure Index", value: "75%" },
        ].map((item, i) => (
          <Card
            key={i}
            sx={{
              gridColumn: "span 4",
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

        {/* BAR CHART */}
        <Card sx={{ gridColumn: "span 8", borderRadius: 3 }}>
          <CardContent>
            <Typography fontWeight="bold">Construction Progress</Typography>
            <Divider sx={{ mb: 2 }} />

            <BarChart
              height={250}
              series={[
                { data: rows.map((r) => r.progress), label: "Progress" },
              ]}
              xAxis={[
                {
                  data: rows.map((r) => r.name),
                  scaleType: "band",
                },
              ]}
            />
          </CardContent>
        </Card>

        {/* PIE CHART */}
        <Card sx={{ gridColumn: "span 4", borderRadius: 3 }}>
          <CardContent>
            <Typography fontWeight="bold">Land Use</Typography>
            <Divider sx={{ mb: 2 }} />

            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 40, label: "Residential" },
                    { id: 1, value: 35, label: "Commercial" },
                    { id: 2, value: 25, label: "Government" },
                  ],
                },
              ]}
              height={220}
            />
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card sx={{ gridColumn: "span 12", borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Urban Development Table
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ height: 350 }}>
              <DataGrid
                rows={rows}
                columns={[
                  { field: "id", headerName: "ID", width: 70 },
                  { field: "name", headerName: "Zone", flex: 1 },
                  { field: "status", headerName: "Status", width: 140 },
                  { field: "progress", headerName: "Progress", width: 140 },
                ]}
                sx={{
                  border: "none",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* DRAWER */}
      <Drawer
        anchor="right"
        open={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      >
        <Box sx={{ width: 340, p: 3 }}>
          {selectedProject && (
            <>
              <Typography variant="h6" fontWeight="bold">
                {selectedProject.name}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1}>
                <Typography>
                  <strong>Status:</strong> {selectedProject.status}
                </Typography>

                <Typography>
                  <strong>Progress:</strong> {selectedProject.progress}%
                </Typography>

                <Typography color="text.secondary">
                  {selectedProject.description}
                </Typography>
              </Stack>

              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Gauge
                  width={160}
                  height={160}
                  value={selectedProject.progress}
                />
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}