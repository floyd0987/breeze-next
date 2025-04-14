'use client'

import { useEffect, useState } from "react"
import { DataTable } from "@/components/data-table"

type Actor = {
  actor_id: number
  first_name: string
  last_name: string
}

type PaginatedResponse<T> = {
  current_page: number
  data: T[]
  last_page: number
  per_page: number
  total: number
}

export default function ActorsPage() {
  const [actors, setActors] = useState<Actor[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)

  useEffect(() => {
    fetch(`http://localhost:8000/api/actors?page=${page}`)
      .then((res) => res.json())
      .then((data: PaginatedResponse<Actor>) => {

        console.log("data", data);

        setActors(data.data)
        setLastPage(data.last_page)
      })
  }, [page])

  return (
    <DataTable data={actors} />
  )
}
