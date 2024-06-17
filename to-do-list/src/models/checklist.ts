import mongoose, { Schema, Model } from 'mongoose';
import { IChecklist } from './interfaces/iChecklist';

const checklistSchema: Schema<IChecklist> = new Schema({
    name: {type: String, required: true},
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
})

const Checklist: Model<IChecklist> = mongoose.model<IChecklist>('Checklist', checklistSchema);
export default Checklist;