import { Model, Schema, model } from 'mongoose';

interface IRole {
  name: string
}

type RoleModel = Model<IRole, {}, {}>;

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true }
});

export const Role = model<IRole, RoleModel>('Role', roleSchema);