import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getRma from "app/rmas/queries/getRma"
import updateRma from "app/rmas/mutations/updateRma"
import RmaForm from "app/rmas/components/RmaForm"

export const EditRma = () => {
  const router = useRouter()
  const rmaId = useParam("rmaId", "number")
  const [rma, { mutate }] = useQuery(getRma, { where: { id: rmaId } })
  const [updateRmaMutation] = useMutation(updateRma)

  return (
    <div>
      <h1>Edit Rma {rma.id}</h1>
      <pre>{JSON.stringify(rma)}</pre>

      <RmaForm
        initialValues={rma}
        onSubmit={async () => {
          try {
            const updated = await updateRmaMutation({
              where: { id: rma.id },
              data: { userhash: "MyNewName" },
            })
            await mutate(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push("/rmas/[rmaId]", `/rmas/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error creating rma " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditRmaPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRma />
      </Suspense>

      <p>
        <Link href="/rmas">
          <a>Rmas</a>
        </Link>
      </p>
    </div>
  )
}

EditRmaPage.getLayout = (page) => <Layout title={"Edit Rma"}>{page}</Layout>

export default EditRmaPage
