import { Ctx } from "blitz"
import db, { EquipmentCreateArgs } from "db"

type CreateEquipmentInput = Pick<EquipmentCreateArgs, "data">
export default async function createEquipment({ data }: CreateEquipmentInput, ctx: Ctx) {
  ctx.session.authorize()

  const equipment = await db.equipment.create({ data })

  return equipment
}
