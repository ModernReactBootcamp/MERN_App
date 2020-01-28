const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const todoRoutes = express.Router();
const PORT = process.env.PORT || 8080;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const MONGODB_URI =
  'mongodb+srv://kdord:kdordExerciseApp@cluster0-7mvfw.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo DB Connection Est. Yay!!');
});

todoRoutes.route('/').get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route('/:id').get((req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

todoRoutes.route('/add').post((req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then(todo => {
      res.status(200).json({ todo: 'Todo Added' });
    })
    .catch(err => {
      res.status(400).send('Adding Failed');
    });
});

todoRoutes.route('/update/:id').post((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      res.status(404).send('data is not found');
    } else {
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;

      todo
        .save()
        .then(todo => {
          res.json('Todo Updated');
        })
        .catch(err => {
          res.status(400).send('Update not possible');
        });
    }
  });
});

app.use('/todos', todoRoutes);

// For production = Build

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (request, response) => {
    response.sendFile(
      path.join(__dirname, 'client/build/static', 'index.html')
    );
  });
}
app.listen(PORT, () => {
  console.log(`Started @ ${PORT}`);
});
