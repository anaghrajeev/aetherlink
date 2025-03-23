"use client"

import type React from "react"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { registerProduct } from "@/lib/blockchain-service"

export default function RegisterProduct() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    description: "",
    manufacturer: "",
    manufactureDate: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate blockchain transaction
      await registerProduct(formData)

      toast({
        title: "Product Registered Successfully",
        description: `Product ${formData.name} has been registered on the blockchain.`,
        variant: "default",
      })

      // Redirect to products page after successful registration
      router.push("/products")
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error registering your product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Register New Product" text="Add a new product to the blockchain" />
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Enter the details of the product you want to register on the blockchain.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">Product ID</Label>
                <Input
                  id="id"
                  name="id"
                  placeholder="Enter unique product ID"
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Manufacturer</Label>
                <Input
                  id="manufacturer"
                  name="manufacturer"
                  placeholder="Enter manufacturer name"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufactureDate">Manufacture Date</Label>
                <Input
                  id="manufactureDate"
                  name="manufactureDate"
                  type="date"
                  value={formData.manufactureDate}
                  onChange={handleChange}
                  required
                />
              </div>
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
                  Registering...
                </>
              ) : (
                "Register Product"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}

