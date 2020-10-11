import { Ctx } from "blitz"
import db, { EquipmentUpdateArgs } from "db"

type UpdateEquipmentInput = Pick<EquipmentUpdateArgs, "where" | "data">

export default async function updateEquipment({ where, data }: UpdateEquipmentInput, ctx: Ctx) {
  ctx.session.authorize()

  const equipment = await db.equipment.update({ where, data })

  return equipment
}
