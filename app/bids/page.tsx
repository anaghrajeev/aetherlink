"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Plus, ArrowUpDown, Clock } from "lucide-react"
import { getAllBids } from "@/lib/blockchain-service"
import type { BidType } from "@/lib/types"

export default function BidsPage() {
  const [bids, setBids] = useState<BidType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const data = await getAllBids()
        setBids(data)
      } catch (error) {
        console.error("Failed to fetch bids:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBids()
  }, [])

  return (
    <DashboardShell>
      <DashboardHeader heading="Transportation Bids" text="View and manage transportation contracts">
        <Button asChild>
          <Link href="/bids/create">
            <Plus className="mr-2 h-4 w-4" /> Create Bid
          </Link>
        </Button>
      </DashboardHeader>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bids.length === 0 ? (
            <div className="md:col-span-2 lg:col-span-3 text-center py-12">
              <p className="text-muted-foreground">No bids available. Create a new bid to get started.</p>
            </div>
          ) : (
            bids.map((bid) => (
              <Card key={bid.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{bid.productName}</CardTitle>
                    <Badge variant={bid.status === "Open" ? "outline" : "default"}>{bid.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Deadline: {bid.deadline}</span>
                      </div>
                      <div className="font-medium">${bid.amount}</div>
                    </div>

                    <div className="flex items-center text-sm">
                      <ArrowUpDown className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p>From: {bid.origin}</p>
                        <p>To: {bid.destination}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/products/${bid.productId}`}>View Product</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/bids/${bid.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </DashboardShell>
  )
}

