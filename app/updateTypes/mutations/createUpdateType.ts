import { Ctx } from "blitz"
import db, { UpdateTypeCreateArgs } from "db"

type CreateUpdateTypeInput = Pick<UpdateTypeCreateArgs, "data">
export default async function createUpdateType({ data }: CreateUpdateTypeInput, ctx: Ctx) {
  ctx.session.authorize()

  const updateType = await db.updateType.create({ data })

  return updateType
}
