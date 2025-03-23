"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Jan",
    products: 12,
    bids: 5,
    transfers: 8,
  },
  {
    name: "Feb",
    products: 18,
    bids: 7,
    transfers: 10,
  },
  {
    name: "Mar",
    products: 15,
    bids: 9,
    transfers: 12,
  },
  {
    name: "Apr",
    products: 20,
    bids: 12,
    transfers: 15,
  },
  {
    name: "May",
    products: 22,
    bids: 14,
    transfers: 18,
  },
  {
    name: "Jun",
    products: 24,
    bids: 7,
    transfers: 12,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="products" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        <Bar dataKey="bids" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        <Bar dataKey="transfers" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

