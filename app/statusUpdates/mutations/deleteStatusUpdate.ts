import { Ctx } from "blitz"
import db, { StatusUpdateDeleteArgs } from "db"

type DeleteStatusUpdateInput = Pick<StatusUpdateDeleteArgs, "where">

export default async function deleteStatusUpdate({ where }: DeleteStatusUpdateInput, ctx: Ctx) {
  ctx.session.authorize()

  const statusUpdate = await db.statusUpdate.delete({ where })

  return statusUpdate
}
