import { Ctx } from "blitz"
import db, { StatusUpdateCreateArgs } from "db"

type CreateStatusUpdateInput = Pick<StatusUpdateCreateArgs, "data">
export default async function createStatusUpdate({ data }: CreateStatusUpdateInput, ctx: Ctx) {
  ctx.session.authorize()

  const statusUpdate = await db.statusUpdate.create({ data })

  return statusUpdate
}
