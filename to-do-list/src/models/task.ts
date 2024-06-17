import mongoose, { Schema, Model } from 'mongoose';
import { ITask } from "./interfaces/iTask";


const taskSchema: Schema<ITask> = new Schema({
    name: {type: String, required: true},
    completed: {type: Boolean, default: false},
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true
    }
})

const Task: Model<ITask> = mongoose.model<ITask>('Task', taskSchema);
export default Task;