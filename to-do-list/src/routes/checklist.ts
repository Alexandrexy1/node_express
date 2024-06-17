import { Router, Request, Response } from "express";
import Checklist from "../models/checklist";

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        let checklists = await Checklist.find({}).populate("tasks");
        res.status(200).render('../views/checklists/index', { checklists, url:req.protocol + "://" + req.headers.host });
    } catch(error) {
        res.status(500).render('../views/pages/error', { error: "Error page not found", url:req.protocol + "://" + req.headers.host });
    }
})

router.get('/new', async (req: Request, res: Response) => {
    const checklist = new Checklist();
;
    try {
        res.status(200).render('../views/checklists/new', { checklist, url:req.protocol + "://" + req.headers.host });
    } catch(error) {
        res.status(422).render('../views/checklists/new', { error: "Error page not found", url:req.protocol + "://" + req.headers.host });
    }
})

router.get('/edit/:id', async (req: Request, res: Response) => {
    try {
        const checklist = await Checklist.findById(req.params.id);
        res.status(200).render('../views/checklists/edit', { checklist, url:req.protocol + "://" + req.headers.host })
    } catch(error) {
        res.status(422).render('../views/checklists/new', { error: "Error page not found", url:req.protocol + "://" + req.headers.host });

    }
})

router.post('/', async (req: Request, res: Response) => {
    let { name } = req.body.checklist;

    try {
        const checklist = new Checklist({ name });
        await checklist.save();
        res.status(200).redirect('/checklists');
    } catch(error) {
        res.status(422).render('/checklists/new', { checklist: { ...Checklist, error } });
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const checklist = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('../views/checklists/show', { checklist, url:req.protocol + "://" + req.headers.host });
    } catch(error) {
        res.status(500).render('../views/pages/error', { error: "Error page not found", url:req.protocol + "://" + req.headers.host });
    }
})

router.put('/:id', async (req: Request, res: Response) => {
    const { name } = req.body.checklist;
    const checklist = await Checklist.findById(req.params.id);
    try {
        await checklist?.updateOne({ name });
        res.status(200).redirect('/checklists');
    } catch(error) {
        res.status(422).render('../views/pages/error', { checklist: {...checklist, error }, url: req.protocol + "://" + req.headers.host });
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        await Checklist.findByIdAndDelete(req.params.id)
        res.status(200).redirect('/checklists');
    } catch(error) {
        res.status(500).render('../views/pages/error', { error: "Error deleting checklist", url: req.protocol + "://" + req.headers.host })
    }
})
