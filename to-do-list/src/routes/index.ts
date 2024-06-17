import { Router, Request, Response } from "express";

export const routerIndex = Router();

routerIndex.get('/', async (req: Request, res: Response) => {
    res.render('pages/index', {url:req.protocol + "://" + req.headers.host});
})