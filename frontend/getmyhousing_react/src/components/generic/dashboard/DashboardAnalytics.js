import { React } from "react";
import {
  Box,
  Card,
  Grid,
  Paper,
} from "@mui/material";
import DashBoardHeader from "./DashBoardHeader";
import DashBoardNavbar from "./DashBoardNavbar";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

const data = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" },
];

const DashboardAnalytics = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <DashBoardNavbar />
        <Box
          component="header"
          sx={{ flexGrow: 1, p: 2, backgroundColor: "#F6F8FB" }}
        >
          <DashBoardHeader />
          <Paper sx={{ mt: 3, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: ["group A", "group B", "group C"],
                    },
                  ]}
                  series={[
                    { data: [4, 3, 5] },
                    { data: [1, 6, 3] },
                    { data: [2, 5, 6] },
                  ]}
                  height={300}
                />
              </Grid>
              <Grid item md={4}>
                <Card>
                  <PieChart
                    series={[
                      {
                        data,
                        highlightScope: {
                          faded: "global",
                          highlighted: "item",
                        },
                        faded: {
                          innerRadius: 30,
                          additionalRadius: -30,
                          color: "gray",
                        },
                      },
                    ]}
                    height={200}
                  />
                </Card>
              </Grid>
              <Grid item md={4}>
                <Card>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    height={200}
                  />
                </Card>
              </Grid>
              <Grid item md={4}>
                <Card>
                  <SparkLineChart
                    plotType="bar"
                    data={[1, 4, 2, 5, 7, 2, 4, 6]}
                    height={200}
                  />
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default DashboardAnalytics;
