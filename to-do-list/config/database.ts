export const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo-list')
    .then(() => console.log('MongoDB connected'))
    .catch( (error: Error) => console.log(error) );