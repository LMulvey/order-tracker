import { Ctx } from "blitz"
import db, { RegionCreateArgs } from "db"

type CreateRegionInput = Pick<RegionCreateArgs, "data">
export default async function createRegion({ data }: CreateRegionInput, ctx: Ctx) {
  ctx.session.authorize()

  const region = await db.region.create({ data })

  return region
}
