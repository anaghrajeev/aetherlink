import type { ProductType, BidType, CustodyTransferType } from "./types"

// Simulate local storage as blockchain
const PRODUCTS_KEY = "aetherlink_products"
const BIDS_KEY = "aetherlink_bids"
const CUSTODY_TRANSFERS_KEY = "aetherlink_custody_transfers"

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 10)

// Helper to get current date in string format
const getCurrentDate = () => {
  const date = new Date()
  return date.toISOString().split("T")[0]
}

// Initialize local storage with sample data if empty
const initializeStorage = () => {
  if (typeof window === "undefined") return

  // Sample products
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    const sampleProducts: ProductType[] = [
      {
        id: "prod-1234",
        name: "Organic Coffee Beans",
        description: "Premium organic coffee beans from Colombia",
        manufacturer: "Green Farms Co.",
        manufactureDate: "2023-10-15",
        status: "Registered",
        events: [
          {
            title: "Product Registered",
            description: "Product registered on the blockchain",
            timestamp: "2023-10-15",
          },
        ],
      },
      {
        id: "prod-5678",
        name: "Electronics Package",
        description: "High-end electronics shipment",
        manufacturer: "TechGiant Inc.",
        manufactureDate: "2023-11-20",
        status: "In Transit",
        events: [
          {
            title: "Product Registered",
            description: "Product registered on the blockchain",
            timestamp: "2023-11-20",
          },
          {
            title: "Bid Accepted",
            description: "Transportation bid accepted",
            timestamp: "2023-11-22",
          },
          {
            title: "Custody Transferred",
            description: "Custody transferred to carrier",
            timestamp: "2023-11-25",
          },
        ],
      },
    ]
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts))
  }

  // Sample bids
  if (!localStorage.getItem(BIDS_KEY)) {
    const sampleBids: BidType[] = [
      {
        id: "bid-1234",
        productId: "prod-5678",
        productName: "Electronics Package",
        carrier: "FastShip Logistics",
        amount: "1200",
        origin: "Seattle, WA",
        destination: "Chicago, IL",
        deadline: "2023-12-15",
        status: "Accepted",
      },
      {
        id: "bid-5678",
        productId: "prod-1234",
        productName: "Organic Coffee Beans",
        carrier: "EcoTransport",
        amount: "800",
        origin: "Bogotá, Colombia",
        destination: "Miami, FL",
        deadline: "2023-12-20",
        status: "Open",
      },
    ]
    localStorage.setItem(BIDS_KEY, JSON.stringify(sampleBids))
  }

  // Sample custody transfers
  if (!localStorage.getItem(CUSTODY_TRANSFERS_KEY)) {
    const sampleTransfers: CustodyTransferType[] = [
      {
        id: "transfer-1234",
        productId: "prod-5678",
        productName: "Electronics Package",
        from: "TechGiant Inc.",
        to: "FastShip Logistics",
        date: "2023-11-25",
        status: "Completed",
      },
    ]
    localStorage.setItem(CUSTODY_TRANSFERS_KEY, JSON.stringify(sampleTransfers))
  }
}

// Product operations
export const getAllProducts = async (): Promise<ProductType[]> => {
  if (typeof window === "undefined") return []

  initializeStorage()

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const products = localStorage.getItem(PRODUCTS_KEY)
  return products ? JSON.parse(products) : []
}

export const getProductById = async (id: string): Promise<ProductType | null> => {
  if (typeof window === "undefined") return null

  initializeStorage()

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const products = localStorage.getItem(PRODUCTS_KEY)
  const parsedProducts: ProductType[] = products ? JSON.parse(products) : []
  return parsedProducts.find((product) => product.id === id) || null
}

export const registerProduct = async (productData: any): Promise<ProductType> => {
  if (typeof window === "undefined") throw new Error("Cannot access storage")

  initializeStorage()

  // Simulate network delay and blockchain transaction
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const products = localStorage.getItem(PRODUCTS_KEY)
  const parsedProducts: ProductType[] = products ? JSON.parse(products) : []

  const newProduct: ProductType = {
    ...productData,
    status: "Registered",
    events: [
      {
        title: "Product Registered",
        description: "Product registered on the blockchain",
        timestamp: getCurrentDate(),
      },
    ],
  }

  parsedProducts.push(newProduct)
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(parsedProducts))

  return newProduct
}

// Bid operations
export const getAllBids = async (): Promise<BidType[]> => {
  if (typeof window === "undefined") return []

  initializeStorage()

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const bids = localStorage.getItem(BIDS_KEY)
  return bids ? JSON.parse(bids) : []
}

export const createBid = async (bidData: any): Promise<BidType> => {
  if (typeof window === "undefined") throw new Error("Cannot access storage")

  initializeStorage()

  // Simulate network delay and blockchain transaction
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const bids = localStorage.getItem(BIDS_KEY)
  const parsedBids: BidType[] = bids ? JSON.parse(bids) : []

  // Get product name
  const products = localStorage.getItem(PRODUCTS_KEY)
  const parsedProducts: ProductType[] = products ? JSON.parse(products) : []
  const product = parsedProducts.find((p) => p.id === bidData.productId)

  const newBid: BidType = {
    id: `bid-${generateId()}`,
    productName: product?.name || "Unknown Product",
    status: "Open",
    ...bidData,
  }

  parsedBids.push(newBid)
  localStorage.setItem(BIDS_KEY, JSON.stringify(parsedBids))

  return newBid
}

// Custody transfer operations
export const getAllCustodyTransfers = async (): Promise<CustodyTransferType[]> => {
  if (typeof window === "undefined") return []

  initializeStorage()

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const transfers = localStorage.getItem(CUSTODY_TRANSFERS_KEY)
  return transfers ? JSON.parse(transfers) : []
}

export const createCustodyTransfer = async (transferData: any): Promise<CustodyTransferType> => {
  if (typeof window === "undefined") throw new Error("Cannot access storage")

  initializeStorage()

  // Simulate network delay and blockchain transaction
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const transfers = localStorage.getItem(CUSTODY_TRANSFERS_KEY)
  const parsedTransfers: CustodyTransferType[] = transfers ? JSON.parse(transfers) : []

  // Get product name
  const products = localStorage.getItem(PRODUCTS_KEY)
  const parsedProducts: ProductType[] = products ? JSON.parse(products) : []
  const product = parsedProducts.find((p) => p.id === transferData.productId)

  const newTransfer: CustodyTransferType = {
    id: `transfer-${generateId()}`,
    productName: product?.name || "Unknown Product",
    date: getCurrentDate(),
    status: "Pending",
    ...transferData,
  }

  parsedTransfers.push(newTransfer)
  localStorage.setItem(CUSTODY_TRANSFERS_KEY, JSON.stringify(parsedTransfers))

  // Update product status and events
  if (product) {
    product.status = "In Transit"
    product.events = [
      ...(product.events || []),
      {
        title: "Custody Transfer Initiated",
        description: `Custody transfer from ${transferData.from} to ${transferData.to}`,
        timestamp: getCurrentDate(),
      },
    ]

    const updatedProducts = parsedProducts.map((p) => (p.id === product.id ? product : p))

    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts))
  }

  return newTransfer
}

