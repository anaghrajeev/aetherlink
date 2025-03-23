"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { createCustodyTransfer, getAllProducts } from "@/lib/blockchain-service"
import type { ProductType } from "@/lib/types"

export default function CustodyTransferPage() {
  const { toast } = useToast()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<ProductType[]>([])
  const [formData, setFormData] = useState({
    productId: "",
    from: "",
    to: "",
    notes: "",
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
      await createCustodyTransfer(formData)

      toast({
        title: "Custody Transfer Initiated",
        description: "The custody transfer has been recorded on the blockchain.",
        variant: "default",
      })

      // Redirect to custody page after successful transfer
      router.push("/custody")
    } catch (error) {
      toast({
        title: "Transfer Failed",
        description: "There was an error initiating the custody transfer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Initiate Custody Transfer" text="Transfer product custody to another entity" />
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
            <CardDescription>Enter the details of the custody transfer.</CardDescription>
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
                <Label htmlFor="from">From (Current Custodian)</Label>
                <Input
                  id="from"
                  name="from"
                  placeholder="Enter current custodian"
                  value={formData.from}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">To (New Custodian)</Label>
                <Input
                  id="to"
                  name="to"
                  placeholder="Enter new custodian"
                  value={formData.to}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input
                id="notes"
                name="notes"
                placeholder="Enter any additional notes"
                value={formData.notes}
                onChange={handleChange}
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
                  Initiating Transfer...
                </>
              ) : (
                "Initiate Transfer"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}

