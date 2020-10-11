import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getRmas from "app/rmas/queries/getRmas"

const ITEMS_PER_PAGE = 100

export const RmasList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ rmas, hasMore }] = usePaginatedQuery(getRmas, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {rmas.map((rma) => (
          <li key={rma.id}>
            <Link href="/rmas/[rmaId]" as={`/rmas/${rma.id}`}>
              <a>{rma.userhash}</a>
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

const RmasPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/rmas/new">
          <a>Create Rma</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <RmasList />
      </Suspense>
    </div>
  )
}

RmasPage.getLayout = (page) => <Layout title={"Rmas"}>{page}</Layout>

export default RmasPage
