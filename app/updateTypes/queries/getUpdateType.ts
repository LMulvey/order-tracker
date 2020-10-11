import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstUpdateTypeArgs } from "db"

type GetUpdateTypeInput = Pick<FindFirstUpdateTypeArgs, "where">

export default async function getUpdateType({ where }: GetUpdateTypeInput, ctx: Ctx) {
  ctx.session.authorize()

  const updateType = await db.updateType.findFirst({ where })

  if (!updateType) throw new NotFoundError()

  return updateType
}
