import { Ctx } from "blitz"
import db, { FindManyStatusUpdateArgs } from "db"

type GetStatusUpdatesInput = Pick<FindManyStatusUpdateArgs, "where" | "orderBy" | "skip" | "take">

export default async function getStatusUpdates(
  { where, orderBy, skip = 0, take }: GetStatusUpdatesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const statusUpdates = await db.statusUpdate.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.statusUpdate.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    statusUpdates,
    nextPage,
    hasMore,
    count,
  }
}
