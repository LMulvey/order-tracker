import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getOrders from "app/orders/queries/getOrders"

const ITEMS_PER_PAGE = 100

export const OrdersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ orders, hasMore }] = usePaginatedQuery(getOrders, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <Link href="/orders/[orderId]" as={`/orders/${order.id}`}>
              <a>{order.userhash}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const OrdersPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/orders/new">
          <a>Create Order</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <OrdersList />
      </Suspense>
    </div>
  )
}

OrdersPage.getLayout = (page) => <Layout title={"Orders"}>{page}</Layout>

export default OrdersPage
