import React from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createRma from "app/rmas/mutations/createRma"
import RmaForm from "app/rmas/components/RmaForm"

const NewRmaPage: BlitzPage = () => {
  const router = useRouter()
  const [createRmaMutation] = useMutation(createRma)

  return (
    <div>
      <h1>Create New Rma</h1>

      <RmaForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const rma = await createRmaMutation({ data: { userhash: "MyName" } })
            alert("Success!" + JSON.stringify(rma))
            router.push("/rmas/[rmaId]", `/rmas/${rma.id}`)
          } catch (error) {
            alert("Error creating rma " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/rmas">
          <a>Rmas</a>
        </Link>
      </p>
    </div>
  )
}

NewRmaPage.getLayout = (page) => <Layout title={"Create New Rma"}>{page}</Layout>

export default NewRmaPage
