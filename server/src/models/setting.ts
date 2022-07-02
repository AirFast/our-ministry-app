import { Schema, model } from 'mongoose';

interface ISetting {
  name: string;
  value?: string;
}

const settingSchema = new Schema<ISetting>({
  name: { type: String, required: true, index: { unique: true } },
  value: { type: String, default: '' },
});

export const Setting = model<ISetting>('Setting', settingSchema);
