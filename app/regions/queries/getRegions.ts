import { Ctx } from "blitz"
import db, { FindManyRegionArgs } from "db"

type GetRegionsInput = Pick<FindManyRegionArgs, "where" | "orderBy" | "skip" | "take">

export default async function getRegions(
  { where, orderBy, skip = 0, take }: GetRegionsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const regions = await db.region.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.region.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    regions,
    nextPage,
    hasMore,
    count,
  }
}
