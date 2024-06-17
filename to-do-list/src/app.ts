import express from 'express';
import { router } from './routes/checklist';
import { routerIndex } from './routes/index';
import { soloRouter, taskRouter } from './routes/tasks';


require('../config/database');

const path = require('path');
const methodOverride = require('method-override');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ["GET", "POST"] }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use('/', routerIndex);
app.use('/checklists', router);
app.use("/checklists", taskRouter);
app.use("/tasks", soloRouter);
app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, () => {});
