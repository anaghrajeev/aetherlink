"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, RefreshCw } from "lucide-react"
import { getAllCustodyTransfers } from "@/lib/blockchain-service"
import type { CustodyTransferType } from "@/lib/types"

export default function CustodyPage() {
  const [transfers, setTransfers] = useState<CustodyTransferType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await getAllCustodyTransfers()
        setTransfers(data)
      } catch (error) {
        console.error("Failed to fetch custody transfers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransfers()
  }, [])

  return (
    <DashboardShell>
      <DashboardHeader heading="Custody Transfers" text="Manage product custody throughout the supply chain">
        <Button asChild>
          <Link href="/custody/transfer">
            <Plus className="mr-2 h-4 w-4" /> New Transfer
          </Link>
        </Button>
      </DashboardHeader>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
            <CardDescription>View all custody transfers in the supply chain</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transfers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No custody transfers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  transfers.map((transfer) => (
                    <TableRow key={transfer.id}>
                      <TableCell className="font-medium">{transfer.productName}</TableCell>
                      <TableCell>{transfer.from}</TableCell>
                      <TableCell>{transfer.to}</TableCell>
                      <TableCell>{transfer.date}</TableCell>
                      <TableCell>
                        <Badge variant={transfer.status === "Pending" ? "outline" : "default"}>{transfer.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/custody/${transfer.id}`}>
                            <RefreshCw className="h-4 w-4 mr-2" /> Details
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </DashboardShell>
  )
}

