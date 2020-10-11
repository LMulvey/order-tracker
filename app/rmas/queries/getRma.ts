import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstRmaArgs } from "db"

type GetRmaInput = Pick<FindFirstRmaArgs, "where">

export default async function getRma({ where }: GetRmaInput, ctx: Ctx) {
  ctx.session.authorize()

  const rma = await db.rma.findFirst({ where })

  if (!rma) throw new NotFoundError()

  return rma
}
