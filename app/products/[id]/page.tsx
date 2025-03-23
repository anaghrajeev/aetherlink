"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Timeline } from "@/components/timeline"
import { ArrowLeft, Package, Truck, RefreshCw } from "lucide-react"
import { getProductById } from "@/lib/blockchain-service"
import type { ProductType } from "@/lib/types"

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  const [product, setProduct] = useState<ProductType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId)
        setProduct(data)
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardShell>
    )
  }

  if (!product) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Product Not Found" text="The product you're looking for doesn't exist">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </DashboardHeader>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={product.name} text={`Product ID: ${product.id}`}>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button asChild>
            <Link href={`/bids/create?productId=${product.id}`}>
              <Truck className="mr-2 h-4 w-4" /> Create Bid
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" /> Product Details
            </CardTitle>
            <CardDescription>Complete information about this product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Badge className="mt-1" variant={product.status === "In Transit" ? "outline" : "default"}>
                    {product.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Manufacturer</p>
                  <p className="text-sm">{product.manufacturer}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm">{product.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Manufacture Date</p>
                  <p className="text-sm">{product.manufactureDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                  <p className="text-sm">{product.lastUpdated || "N/A"}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-4">
          <Tabs defaultValue="timeline">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Product Tracking</CardTitle>
                <TabsList>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="bids">Bids</TabsTrigger>
                  <TabsTrigger value="custody">Custody</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>Track the product's journey through the supply chain</CardDescription>
            </CardHeader>
            <CardContent>
              <TabsContent value="timeline" className="mt-0">
                <Timeline events={product.events || []} />
              </TabsContent>
              <TabsContent value="bids" className="mt-0">
                {product.bids && product.bids.length > 0 ? (
                  <div className="space-y-4">
                    {product.bids.map((bid, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{bid.carrier}</p>
                              <p className="text-sm text-muted-foreground">Bid Amount: ${bid.amount}</p>
                            </div>
                            <Badge variant={bid.status === "Accepted" ? "default" : "outline"}>{bid.status}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No bids available for this product.</p>
                )}
              </TabsContent>
              <TabsContent value="custody" className="mt-0">
                {product.custodyTransfers && product.custodyTransfers.length > 0 ? (
                  <div className="space-y-4">
                    {product.custodyTransfers.map((transfer, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">From: {transfer.from}</p>
                              <p className="text-sm">To: {transfer.to}</p>
                              <p className="text-xs text-muted-foreground">{transfer.date}</p>
                            </div>
                            <RefreshCw className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No custody transfers recorded.</p>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </DashboardShell>
  )
}

