import { Ctx } from "blitz"
import db, { FindManyEquipmentArgs } from "db"

type GetEquipmentInput = Pick<FindManyEquipmentArgs, "where" | "orderBy" | "skip" | "take">

export default async function getEquipment(
  { where, orderBy, skip = 0, take }: GetEquipmentInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const equipment = await db.equipment.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.equipment.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    equipment,
    nextPage,
    hasMore,
    count,
  }
}
