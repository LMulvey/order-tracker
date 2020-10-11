import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getRma from "app/rmas/queries/getRma"
import deleteRma from "app/rmas/mutations/deleteRma"

export const Rma = () => {
  const router = useRouter()
  const rmaId = useParam("rmaId", "number")
  const [rma] = useQuery(getRma, { where: { id: rmaId } })
  const [deleteRmaMutation] = useMutation(deleteRma)

  return (
    <div>
      <h1>Rma {rma.id}</h1>
      <pre>{JSON.stringify(rma, null, 2)}</pre>

      <Link href="/rmas/[rmaId]/edit" as={`/rmas/${rma.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteRmaMutation({ where: { id: rma.id } })
            router.push("/rmas")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowRmaPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/rmas">
          <a>Rmas</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Rma />
      </Suspense>
    </div>
  )
}

ShowRmaPage.getLayout = (page) => <Layout title={"Rma"}>{page}</Layout>

export default ShowRmaPage
