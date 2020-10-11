import { Ctx } from "blitz"
import db, { UpdateTypeDeleteArgs } from "db"

type DeleteUpdateTypeInput = Pick<UpdateTypeDeleteArgs, "where">

export default async function deleteUpdateType({ where }: DeleteUpdateTypeInput, ctx: Ctx) {
  ctx.session.authorize()

  const updateType = await db.updateType.delete({ where })

  return updateType
}
