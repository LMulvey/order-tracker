import { Ctx } from "blitz"
import db, { StatusUpdateUpdateArgs } from "db"

type UpdateStatusUpdateInput = Pick<StatusUpdateUpdateArgs, "where" | "data">

export default async function updateStatusUpdate(
  { where, data }: UpdateStatusUpdateInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const statusUpdate = await db.statusUpdate.update({ where, data })

  return statusUpdate
}
