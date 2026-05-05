import React, { useEffect, useState, useRef } from "react";

import { BarChart, PieChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Grid,
  Button
} from "@mui/material";

// ---------------- SAMPLE DATA ----------------
const reportRows = [
  { id: 1, department: "Residential Zone", users: 120, active: 90 },
  { id: 2, department: "CBD", users: 250, active: 210 },
  { id: 3, department: "Government Center", users: 180, active: 150 },
  { id: 4, department: "Transport Hub", users: 95, active: 80 },
];

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "department", headerName: "Urban Zone", flex: 1 },
  { field: "users", headerName: "Occupancy", width: 140 },
  { field: "active", headerName: "Active Use", width: 140 },
];

function ReportsPage() {
  const totalUsers = reportRows.reduce((sum, r) => sum + r.users, 0);
  const totalActive = reportRows.reduce((sum, r) => sum + r.active, 0);

  const [chartReady, setChartReady] = useState(false);

 
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll("style, link[rel='stylesheet']")
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Urban Planning Report</title>
          ${headMarkup}
          <style>
            body { font-family: Arial; margin: 0; padding: 20px; }
            h1 { margin-bottom: 5px; }
            p { color: gray; }
          </style>
        </head>
        <body>
          <h1>Urban Planning Reports</h1>
          <p>Prepared on ${exportedAt}</p>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  useEffect(() => {
    const timer = setTimeout(() => setChartReady(true), 200);
    return () => clearTimeout(timer);
  }, []);

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
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Urban Planning Reports
          </Typography>
          <Typography sx={{ opacity: 0.9 }}>
            Animated visualization of infrastructure and land use distribution
          </Typography>
        </Box>

        {/* ✅ EXPORT BUTTON */}
        <Button variant="contained" onClick={handlePrint}>
          Export
        </Button>
      </Box>

      {/* ✅ EVERYTHING INSIDE HERE WILL BE PRINTED */}
      <Box ref={printRef}>
        {/* KPI CARDS */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { label: "Total Occupancy", value: totalUsers },
            { label: "Active Usage", value: totalActive },
            {
              label: "Efficiency",
              value: `${Math.round((totalActive / totalUsers) * 100)}%`,
            },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography sx={{ color: "gray", fontSize: 14 }}>
                    {item.label}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* BAR CHART */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Urban Zone Utilization
            </Typography>
            <Divider sx={{ my: 2 }} />

            {chartReady && (
              <BarChart
                height={320}
                xAxis={[
                  {
                    data: reportRows.map((r) => r.department),
                    scaleType: "band",
                  },
                ]}
                series={[
                  { data: reportRows.map((r) => r.users), label: "Capacity" },
                  { data: reportRows.map((r) => r.active), label: "Active Use" },
                ]}
              />
            )}
          </CardContent>
        </Card>

        {/* PIE CHART */}
        <Card sx={{ mb: 3, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Zone Distribution
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                width={320}
                height={220}
              />
            </Box>
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Detailed Report
            </Typography>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ height: 360 }}>
              <DataGrid rows={reportRows} columns={columns} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ReportsPage;