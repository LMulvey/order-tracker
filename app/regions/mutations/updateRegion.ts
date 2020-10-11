import { Ctx } from "blitz"
import db, { RegionUpdateArgs } from "db"

type UpdateRegionInput = Pick<RegionUpdateArgs, "where" | "data">

export default async function updateRegion({ where, data }: UpdateRegionInput, ctx: Ctx) {
  ctx.session.authorize()

  const region = await db.region.update({ where, data })

  return region
}
