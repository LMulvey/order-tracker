import { Ctx } from "blitz"
import db, { UpdateTypeUpdateArgs } from "db"

type UpdateUpdateTypeInput = Pick<UpdateTypeUpdateArgs, "where" | "data">

export default async function updateUpdateType({ where, data }: UpdateUpdateTypeInput, ctx: Ctx) {
  ctx.session.authorize()

  const updateType = await db.updateType.update({ where, data })

  return updateType
}
