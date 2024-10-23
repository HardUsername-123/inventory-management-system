"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Updated chart data to match with TotalProducts, TotalSales, and TotalRevenue
const chartData = [
  { month: "January", TotalProducts: 186, TotalSales: 80, TotalRevenue: 150 },
  { month: "February", TotalProducts: 305, TotalSales: 200, TotalRevenue: 250 },
  { month: "March", TotalProducts: 237, TotalSales: 120, TotalRevenue: 190 },
  { month: "April", TotalProducts: 73, TotalSales: 190, TotalRevenue: 220 },
  { month: "May", TotalProducts: 209, TotalSales: 130, TotalRevenue: 180 },
  { month: "June", TotalProducts: 214, TotalSales: 140, TotalRevenue: 210 },
];

const chartConfig = {
  TotalProducts: {
    label: "Total Products",
    color: "#2563eb",
  },
  TotalSales: {
    label: "Total Sales",
    color: "#60a5fa",
  },
  TotalRevenue: {
    label: "Total Revenue",
    color: "#34d399",
  },
};

export function Chart() {
  return (
    <div className="bg-white p-8 rounded-lg">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="TotalProducts"
            fill={chartConfig.TotalProducts.color}
            radius={4}
          />
          <Bar
            dataKey="TotalSales"
            fill={chartConfig.TotalSales.color}
            radius={4}
          />
          <Bar
            dataKey="TotalRevenue"
            fill={chartConfig.TotalRevenue.color}
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
