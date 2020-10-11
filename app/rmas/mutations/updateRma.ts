import { Ctx } from "blitz"
import db, { RmaUpdateArgs } from "db"

type UpdateRmaInput = Pick<RmaUpdateArgs, "where" | "data">

export default async function updateRma({ where, data }: UpdateRmaInput, ctx: Ctx) {
  ctx.session.authorize()

  const rma = await db.rma.update({ where, data })

  return rma
}
