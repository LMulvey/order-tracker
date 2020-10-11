import { Ctx, NotFoundError } from "blitz"
import db, { FindFirstRegionArgs } from "db"

type GetRegionInput = Pick<FindFirstRegionArgs, "where">

export default async function getRegion({ where }: GetRegionInput, ctx: Ctx) {
  ctx.session.authorize()

  const region = await db.region.findFirst({ where })

  if (!region) throw new NotFoundError()

  return region
}
