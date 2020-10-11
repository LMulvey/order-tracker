import { Ctx } from "blitz"
import db, { RegionDeleteArgs } from "db"

type DeleteRegionInput = Pick<RegionDeleteArgs, "where">

export default async function deleteRegion({ where }: DeleteRegionInput, ctx: Ctx) {
  ctx.session.authorize()

  const region = await db.region.delete({ where })

  return region
}
