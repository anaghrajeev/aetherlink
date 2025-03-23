"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function TrackingPage() {
  const router = useRouter()
  const [productId, setProductId] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (productId.trim()) {
      router.push(`/products/${productId}`)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Product Tracking & Verification" text="Track and verify products in the supply chain" />

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Track a Product</CardTitle>
          <CardDescription>Enter a product ID to view its complete supply chain history</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Search className="mr-2 h-4 w-4" /> Track
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Scan a QR code or enter a product ID to verify authenticity and track its journey.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Verification</CardTitle>
            <CardDescription>Verify the authenticity of products</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All products registered on AetherLink are verified using blockchain technology, ensuring tamper-proof
              records of ownership, custody transfers, and transportation.
            </p>
            <Button className="mt-4" variant="outline" onClick={() => router.push("/products")}>
              View All Products
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Visibility</CardTitle>
            <CardDescription>End-to-end visibility of your supply chain</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              AetherLink provides complete transparency into your supply chain, from product registration to final
              delivery, with all events recorded on the blockchain.
            </p>
            <Button className="mt-4" variant="outline" onClick={() => router.push("/custody")}>
              View Custody Transfers
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

