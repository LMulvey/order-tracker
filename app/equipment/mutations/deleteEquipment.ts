import { Ctx } from "blitz"
import db, { EquipmentDeleteArgs } from "db"

type DeleteEquipmentInput = Pick<EquipmentDeleteArgs, "where">

export default async function deleteEquipment({ where }: DeleteEquipmentInput, ctx: Ctx) {
  ctx.session.authorize()

  const equipment = await db.equipment.delete({ where })

  return equipment
}
