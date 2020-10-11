import { Ctx } from "blitz"
import db, { RmaCreateArgs } from "db"

type CreateRmaInput = Pick<RmaCreateArgs, "data">
export default async function createRma({ data }: CreateRmaInput, ctx: Ctx) {
  ctx.session.authorize()

  const rma = await db.rma.create({ data })

  return rma
}
