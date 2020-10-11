import { Ctx } from "blitz"
import db, { FindManyRmaArgs } from "db"

type GetRmasInput = Pick<FindManyRmaArgs, "where" | "orderBy" | "skip" | "take">

export default async function getRmas({ where, orderBy, skip = 0, take }: GetRmasInput, ctx: Ctx) {
  ctx.session.authorize()

  const rmas = await db.rma.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.rma.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    rmas,
    nextPage,
    hasMore,
    count,
  }
}
