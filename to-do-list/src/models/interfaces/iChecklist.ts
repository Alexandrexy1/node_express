import { Document } from 'mongoose';
import { ITask } from './iTask';

export interface IChecklist extends Document {
    name: string;
    tasks: ITask['_id'][];
}
