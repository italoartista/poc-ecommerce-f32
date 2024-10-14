"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { CreateOrderForm } from "./create-order-form"

// Mock data (unchanged)
const mockOrders = [
  // ... (previous mock orders remain unchanged)
]

const mockOrderDetails = {
  // ... (previous mock order details remain unchanged)
}

export default function Dashboard() {
  const [orders, setOrders] = useState(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState(mockOrderDetails)
  const [isLoading, setIsLoading] = useState(true)
  const [timeFrame, setTimeFrame] = useState("week")
  const [filter, setFilter] = useState({ fulfilled: true, declined: true, refunded: true })
  const [showCreateOrderForm, setShowCreateOrderForm] = useState(false)

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
      setOrders(mockOrders)
      setIsLoading(false)
    }

    fetchOrders()
  }, [timeFrame])

  const handleFilterChange = (key: keyof typeof filter) => {
    setFilter(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const filteredOrders = orders.filter(order => {
    if (order.status === "Fulfilled" && !filter.fulfilled) return false
    if (order.status === "Declined" && !filter.declined) return false
    if (order.type === "Refund" && !filter.refunded) return false
    return true
  })

  const weeklyTotal = filteredOrders.reduce((sum, order) => sum + order.amount, 0)
  const monthlyTotal = weeklyTotal * 4 // Simplified calculation for demo purposes

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar (unchanged) */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        {/* ... (sidebar content remains unchanged) */}
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {/* Header (unchanged) */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bordcer-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* ... (header content remains unchanged) */}
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={() => setShowCreateOrderForm(true)}>Create New Order</Button>
                </CardFooter>
              </Card>
              {/* Weekly and Monthly total cards (unchanged) */}
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">${weeklyTotal.toFixed(2)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">${monthlyTotal.toFixed(2)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            {/* Tabs and Table (unchanged) */}
            <Tabs defaultValue="week" value={timeFrame} onValueChange={setTimeFrame}>
              {/* ... (tabs and table content remains unchanged) */}
            </Tabs>
          </div>
          <div>
            {/* Order details card (unchanged) */}
            <Card className="overflow-hidden">
              {/* ... (order details content remains unchanged) */}
            </Card>
          </div>
        </main>
      </div>
      {showCreateOrderForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <CreateOrderForm onClose={() => setShowCreateOrderForm(false)} />
        </div>
      )}
    </div>
  )
}