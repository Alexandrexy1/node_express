import { Router, Request, Response } from "express";


export const router = Router();

router.get("/", (req: Request, res: Response) => {
    console.log("passed home route");
    res.send();
})

router.post('/', (req: Request, res: Response) => {
    console.log(req.body);
    res.status(200).send(req.body);
})

router.get('/:id', (req: Request, res: Response) => {
    console.log('passed GET ID ROUTE');
    res.send(req.params.id);
})

router.put('/:id', (req: Request, res: Response) => {
    console.log('passed PUT ID ROUTE');
    res.send(req.params.id);
})

router.delete('/:id', (req: Request, res: Response) => {
    console.log('passed DELETE ID ROUTE');
    res.send(req.params.id);
})
