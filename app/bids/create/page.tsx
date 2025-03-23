"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { createBid, getAllProducts } from "@/lib/blockchain-service"
import type { ProductType } from "@/lib/types"

export default function CreateBidPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedProductId = searchParams.get("productId")

  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])
  const [formData, setFormData] = useState({
    productId: preselectedProductId || "",
    carrier: "",
    amount: "",
    origin: "",
    destination: "",
    deadline: "",
  })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      }
    }

    fetchProducts()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate blockchain transaction
      await createBid(formData)

      toast({
        title: "Bid Created Successfully",
        description: "Your transportation bid has been submitted to the blockchain.",
        variant: "default",
      })

      // Redirect to bids page after successful creation
      router.push("/bids")
    } catch (error) {
      toast({
        title: "Bid Creation Failed",
        description: "There was an error creating your bid. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Create Transportation Bid" text="Submit a new bid for product transportation" />
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Bid Details</CardTitle>
            <CardDescription>Enter the details of your transportation bid.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productId">Select Product</Label>
              <Select
                value={formData.productId}
                onValueChange={(value) => handleSelectChange("productId", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} ({product.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="carrier">Carrier Name</Label>
                <Input
                  id="carrier"
                  name="carrier"
                  placeholder="Enter carrier name"
                  value={formData.carrier}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Bid Amount ($)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Enter bid amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  name="origin"
                  placeholder="Enter origin location"
                  value={formData.origin}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  name="destination"
                  placeholder="Enter destination location"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Bid"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}

