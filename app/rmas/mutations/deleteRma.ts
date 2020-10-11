import { Ctx } from "blitz"
import db, { RmaDeleteArgs } from "db"

type DeleteRmaInput = Pick<RmaDeleteArgs, "where">

export default async function deleteRma({ where }: DeleteRmaInput, ctx: Ctx) {
  ctx.session.authorize()

  const rma = await db.rma.delete({ where })

  return rma
}
