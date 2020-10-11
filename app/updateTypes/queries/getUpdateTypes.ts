import { Ctx } from "blitz"
import db, { FindManyUpdateTypeArgs } from "db"

type GetUpdateTypesInput = Pick<FindManyUpdateTypeArgs, "where" | "orderBy" | "skip" | "take">

export default async function getUpdateTypes(
  { where, orderBy, skip = 0, take }: GetUpdateTypesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const updateTypes = await db.updateType.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.updateType.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    updateTypes,
    nextPage,
    hasMore,
    count,
  }
}
