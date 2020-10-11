import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstStatusUpdateArgs } from "db"

type GetStatusUpdateInput = Pick<FindFirstStatusUpdateArgs, "where">

export default async function getStatusUpdate({ where }: GetStatusUpdateInput, ctx: Ctx) {
  ctx.session.authorize()

  const statusUpdate = await db.statusUpdate.findFirst({ where })

  if (!statusUpdate) throw new NotFoundError()

  return statusUpdate
}
