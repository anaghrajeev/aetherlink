export interface ProductType {
  id: string
  name: string
  description: string
  manufacturer: string
  manufactureDate: string
  status: string
  lastUpdated?: string
  events?: EventType[]
  bids?: BidType[]
  custodyTransfers?: CustodyTransferType[]
}

export interface BidType {
  id: string
  productId: string
  productName: string
  carrier: string
  amount: string
  origin: string
  destination: string
  deadline: string
  status: string
}

export interface CustodyTransferType {
  id: string
  productId: string
  productName: string
  from: string
  to: string
  date: string
  status: string
  notes?: string
}

export interface EventType {
  title: string
  description: string
  timestamp: string
}

