"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import {
  LayoutDashboard,
  Utensils,
  DoorOpen,
  ShoppingCart,
  Menu,
  Package,
  Users,
  Clock,
  Settings,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  CheckCircle2,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react"

const TOTAL_PROPAGATION_TIME = 72 * 60 * 60 // 72 hours in seconds

export default function PropagationPage() {
  const [showNavPopup, setShowNavPopup] = useState(false)
  const [popupAutoClose, setPopupAutoClose] = useState<NodeJS.Timeout | null>(null)

  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 72,
    minutes: 0,
    seconds: 0,
  })

  const [propagationSteps, setPropagationSteps] = useState([
    {
      id: 1,
      name: "Database Schema Migration",
      status: "completed",
      progress: 100,
      startTime: 0,
      duration: 9 * 60 * 60,
    },
    {
      id: 2,
      name: "User Authentication System",
      status: "completed",
      progress: 100,
      startTime: 9 * 60 * 60,
      duration: 9 * 60 * 60,
    },
    {
      id: 3,
      name: "Order Management Tables",
      status: "in-progress",
      progress: 25,
      startTime: 18 * 60 * 60,
      duration: 9 * 60 * 60,
    },
    {
      id: 4,
      name: "Inventory Synchronization",
      status: "pending",
      progress: 0,
      startTime: 27 * 60 * 60,
      duration: 9 * 60 * 60,
    },
    {
      id: 5,
      name: "Payment Gateway Integration",
      status: "pending",
      progress: 0,
      startTime: 36 * 60 * 60,
      duration: 9 * 60 * 60,
    },
    {
      id: 6,
      name: "Analytics Engine Setup",
      status: "pending",
      progress: 0,
      startTime: 45 * 60 * 60,
      duration: 9 * 60 * 60,
    },
    {
      id: 7,
      name: "Real-time Data Sync",
      status: "pending",
      progress: 0,
      startTime: 54 * 60 * 60,
      duration: 9 * 60 * 60,
    },
    {
      id: 8,
      name: "Final System Verification",
      status: "pending",
      progress: 0,
      startTime: 63 * 60 * 60,
      duration: 9 * 60 * 60,
    },
  ])

  const handleNavClick = (label: string) => {
    if (label !== "Dashboard") {
      setShowNavPopup(true)

      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setShowNavPopup(false)
      }, 5000)

      setPopupAutoClose(timer)
    }
  }

  const closePopup = () => {
    setShowNavPopup(false)
    if (popupAutoClose) {
      clearTimeout(popupAutoClose)
      setPopupAutoClose(null)
    }
  }

  useEffect(() => {
    return () => {
      if (popupAutoClose) {
        clearTimeout(popupAutoClose)
      }
    }
  }, [popupAutoClose])

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => {
        const newElapsed = prev + 1

        const remainingSeconds = Math.max(0, TOTAL_PROPAGATION_TIME - newElapsed)
        const hours = Math.floor(remainingSeconds / 3600)
        const minutes = Math.floor((remainingSeconds % 3600) / 60)
        const seconds = remainingSeconds % 60

        setTimeRemaining({ hours, minutes, seconds })

        return newElapsed
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setPropagationSteps((prev) => {
        return prev.map((step) => {
          const stepEndTime = step.startTime + step.duration

          if (step.id === 1 || step.id === 2) {
            return { ...step, status: "completed", progress: 100 }
          }

          if (step.id === 3) {
            if (elapsedSeconds < step.startTime) {
              return { ...step, status: "in-progress", progress: 25 }
            } else if (elapsedSeconds >= stepEndTime) {
              return { ...step, status: "completed", progress: 100 }
            } else {
              const stepElapsed = elapsedSeconds - step.startTime
              const additionalProgress = (stepElapsed / step.duration) * 75
              const totalProgress = 25 + additionalProgress
              return { ...step, status: "in-progress", progress: Math.min(totalProgress, 100) }
            }
          }

          if (elapsedSeconds < step.startTime) {
            return { ...step, status: "pending", progress: 0 }
          } else if (elapsedSeconds >= stepEndTime) {
            return { ...step, status: "completed", progress: 100 }
          } else {
            const stepElapsed = elapsedSeconds - step.startTime
            const progress = (stepElapsed / step.duration) * 100
            return { ...step, status: "in-progress", progress: Math.min(progress, 100) }
          }
        })
      })
    }, 100)

    return () => clearInterval(progressTimer)
  }, [elapsedSeconds])

  const overallProgress = propagationSteps.reduce((acc, step) => acc + step.progress, 0) / propagationSteps.length

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-60 bg-[#141414] border-r border-[#2a2a2a] flex flex-col">
        <div className="p-6 border-b border-[#2a2a2a]">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6627.PNG-dA7TqHKI5P530V2z6kxIT75cHJtCqz.png"
            alt="Maria Havens Logo"
            className="w-32 h-auto"
          />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="text-xs text-gray-500 mb-2 px-3">Navigation</div>
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active
            onClick={() => handleNavClick("Dashboard")}
          />
          <NavItem icon={<Utensils size={18} />} label="Tables" onClick={() => handleNavClick("Tables")} />
          <NavItem icon={<DoorOpen size={18} />} label="Rooms" onClick={() => handleNavClick("Rooms")} />
          <NavItem icon={<ShoppingCart size={18} />} label="Orders" onClick={() => handleNavClick("Orders")} />
          <NavItem icon={<Menu size={18} />} label="Menu" onClick={() => handleNavClick("Menu")} />
          <NavItem icon={<Package size={18} />} label="Inventory" onClick={() => handleNavClick("Inventory")} />
          <NavItem icon={<Users size={18} />} label="Staff" onClick={() => handleNavClick("Staff")} />
          <NavItem icon={<Clock size={18} />} label="Shifts" onClick={() => handleNavClick("Shifts")} />
          <NavItem icon={<Settings size={18} />} label="Settings" onClick={() => handleNavClick("Settings")} />
        </nav>

        <div className="p-4 border-t border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#b8860b] rounded-full flex items-center justify-center text-black font-semibold">
              A
            </div>
            <div>
              <div className="text-sm font-medium">admin</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto relative">
        <div className="p-8 opacity-30 blur-sm pointer-events-none">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">Welcome to Maria Havens Management System</p>
            </div>
            <button className="p-2 hover:bg-[#1a1a1a] rounded-lg">
              <Settings size={20} />
            </button>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Sales"
              value="KSH 0.00"
              change="0%"
              period="Today"
              icon={<DollarSign size={24} />}
              positive={false}
            />
            <MetricCard
              title="Orders"
              value="0"
              change="0%"
              period="Last 24 hours"
              icon={<ShoppingBag size={24} />}
              positive={false}
            />
            <MetricCard title="Active Tables" value="0/40" subtitle="Currently serving" icon={<Users size={24} />} />
            <MetricCard
              title="Revenue"
              value="KSH 0.00"
              change="0%"
              period="This week"
              icon={<TrendingUp size={24} />}
              positive={false}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="col-span-2">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <div className="space-y-4">
                <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-semibold">#0000</span>
                      <span className="px-3 py-1 bg-[#b8860b]/20 text-[#b8860b] rounded-full text-sm">Pending</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Table --</span>
                      <span>-- minutes ago</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4 text-gray-300">
                    <div>No orders available</div>
                  </div>
                  <button className="w-full bg-[#b8860b] hover:bg-[#9a7209] text-black font-medium py-3 rounded-lg transition-colors">
                    System Unavailable
                  </button>
                </Card>
              </div>
            </div>

            {/* Quick Stats */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6 space-y-6">
                <StatRow label="Peak Hour" value="--:--" />
                <StatRow label="Average Order Value" value="KSH 0.00" highlight />
                <StatRow label="Popular Item" value="--" />
                <StatRow label="Staff On Duty" value="0 / 0" />
              </Card>
            </div>
          </div>
        </div>

        {/* Propagation Overlay */}
        <div className="absolute inset-0 bg-[#0a0a0a]/95 backdrop-blur-md flex items-center justify-center">
          <div className="max-w-2xl w-full mx-4">
            <Card className="bg-[#141414] border-[#2a2a2a] p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#b8860b]/20 rounded-full mb-4">
                  <Loader2 className="w-10 h-10 text-[#b8860b] animate-spin" />
                </div>
                <h2 className="text-3xl font-bold mb-2">System Propagation in Progress</h2>
                <p className="text-gray-400">Database synchronization and system initialization underway</p>
              </div>

              {/* Countdown Timer */}
              <div className="bg-[#1a1a1a] rounded-lg p-6 mb-8">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-2">Estimated Time Remaining</div>
                  <div className="flex items-center justify-center gap-4 text-4xl font-bold font-mono">
                    <div className="flex flex-col items-center">
                      <span className="text-[#b8860b]">{String(timeRemaining.hours).padStart(2, "0")}</span>
                      <span className="text-xs text-gray-500 mt-1">HOURS</span>
                    </div>
                    <span className="text-gray-600">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[#b8860b]">{String(timeRemaining.minutes).padStart(2, "0")}</span>
                      <span className="text-xs text-gray-500 mt-1">MINUTES</span>
                    </div>
                    <span className="text-gray-600">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-[#b8860b]">{String(timeRemaining.seconds).padStart(2, "0")}</span>
                      <span className="text-xs text-gray-500 mt-1">SECONDS</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-[#0a0a0a] rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#b8860b] to-green-500 transition-all duration-300"
                        style={{ width: `${overallProgress}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Overall Progress: {Math.round(overallProgress)}%</div>
                  </div>
                </div>
              </div>

              {/* Propagation Steps */}
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-400 mb-4">Propagation Status</div>
                {propagationSteps.map((step) => (
                  <div key={step.id} className="bg-[#1a1a1a] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {step.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        ) : step.status === "in-progress" ? (
                          <Loader2 className="w-5 h-5 text-[#b8860b] animate-spin" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                        )}
                        <span className={`text-sm ${step.status === "completed" ? "text-gray-400" : "text-white"}`}>
                          {step.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{Math.round(step.progress)}%</span>
                    </div>
                    <div className="w-full bg-[#0a0a0a] rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          step.status === "completed"
                            ? "bg-green-500"
                            : step.status === "in-progress"
                              ? "bg-[#b8860b]"
                              : "bg-gray-700"
                        }`}
                        style={{ width: `${step.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-lg">
                <p className="text-sm text-center text-gray-300">
                  <span className="font-semibold text-[#b8860b]">Please wait:</span> The system is currently undergoing
                  database propagation and synchronization. All features will be available once the process is complete.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {showNavPopup && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
            <Card className="bg-[#141414] border-[#b8860b]/50 p-8 max-w-md mx-4 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#b8860b]/20 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-[#b8860b]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">System Unavailable</h3>
                    <p className="text-sm text-gray-400">Feature currently locked</p>
                  </div>
                </div>
                <button
                  onClick={closePopup}
                  className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-[#1a1a1a] rounded"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#2a2a2a]">
                  <div className="flex items-center gap-3 mb-3">
                    <Loader2 className="w-5 h-5 text-[#b8860b] animate-spin" />
                    <span className="text-sm font-medium text-white">Propagation in Progress</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    The system is currently undergoing database propagation and synchronization. This feature will be
                    available once the process is complete.
                  </p>
                </div>

                <div className="bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-[#b8860b]" />
                    <span className="text-sm font-medium text-[#b8860b]">Estimated Time Remaining</span>
                  </div>
                  <p className="text-2xl font-bold font-mono text-white">
                    {String(timeRemaining.hours).padStart(2, "0")}:{String(timeRemaining.minutes).padStart(2, "0")}:
                    {String(timeRemaining.seconds).padStart(2, "0")}
                  </p>
                </div>
              </div>

              <button
                onClick={closePopup}
                className="w-full bg-[#b8860b] hover:bg-[#9a7209] text-black font-semibold py-3 rounded-lg transition-colors"
              >
                OK, I Understand
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">This popup will auto-close in 5 seconds</p>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        active ? "bg-[#1a1a1a] text-white" : "text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  )
}

function MetricCard({
  title,
  value,
  change,
  period,
  subtitle,
  icon,
  positive = true,
}: {
  title: string
  value: string
  change?: string
  period?: string
  subtitle?: string
  icon: React.ReactNode
  positive?: boolean
}) {
  return (
    <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="text-sm text-gray-400">{title}</div>
        <div className="w-12 h-12 bg-[#b8860b]/20 rounded-lg flex items-center justify-center text-[#b8860b]">
          {icon}
        </div>
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      {change && (
        <div className="flex items-center gap-2 text-sm">
          <span className={positive ? "text-green-500" : "text-red-500"}>{change}</span>
          <span className="text-gray-500">{period}</span>
        </div>
      )}
      {subtitle && <div className="text-sm text-gray-400">{subtitle}</div>}
    </Card>
  )
}

function StatRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-400">{label}</span>
      <span className={`text-sm font-medium ${highlight ? "text-[#b8860b]" : "text-white"}`}>{value}</span>
    </div>
  )
}
