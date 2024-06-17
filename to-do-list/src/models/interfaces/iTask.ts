import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
    name: string;
    completed: boolean;
    checklist: mongoose.Schema.Types.ObjectId;
}
