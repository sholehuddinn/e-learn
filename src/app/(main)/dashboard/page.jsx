"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import UnauthorizedPage from "@/components/Unautorizhed"
import Swal from "sweetalert2"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem("token")

    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized",
        text: "Silakan login dulu!",
      }).then(() => {
        router.push("/login")
      })
    } else {
      setIsLoggedIn(true)
    }

    setChecked(true)
  }, [router])

  if (!checked) {
    return <UnauthorizedPage />
  }

  if (!isLoggedIn) {
    return <UnauthorizedPage />
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Halo, selamat datang kembali 👋</p>
    </div>
  )
}
