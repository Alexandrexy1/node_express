import { Router, Request, Response } from "express";

import Task from "../models/task";
import Checklist from "../models/checklist";

export const taskRouter = Router();
export const soloRouter = Router();

taskRouter.get("/:id/tasks/new", async (req: Request, res: Response) => {
    try {
        let task = new Task();
        
        res.status(200).render("../views/tasks/new", { checklistId: req.params.id, task, url: req.protocol + "://" + req.headers.host });
    } catch (error) {
        res.send(422).render('../views/pages/error', { error: "Error task not found", url: req.protocol + "://" + req.headers.host })
    }
})

taskRouter.post("/:id/tasks", async (req: Request, res: Response) => {
    let { name } = req.body.task;
    const task = new Task({ name, checklist: req.params.id });
    try {
        await task.save();
        const checklist = await Checklist.findById(req.params.id);
        checklist?.tasks.push(task);
        await checklist?.save();

        res.status(200).redirect(`/checklists/${req.params.id}`);
    } catch (error) {
        res.status(422).render("../views/pages/error", { error: "Error adding task", url: req.protocol + "://" + req.headers.host });
    }
})

soloRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        const checklist = await Checklist.findById(task?.checklist);
        const taskInChecklist = checklist?.tasks.indexOf(task?._id);
        checklist?.tasks.slice(taskInChecklist, 1);

        checklist?.save();
        
        res.status(200).redirect(`/checklists/${checklist?._id}`);
    } catch (error) {
        res.status(500).render("../views/pages/error", { error: "Error deleting task", url: req.protocol + "://" + req.headers.host });
    }
})
