import express from 'express'

const app = express()
const port = 3000

const todos = [];

app.use(express.json())

// Todo Get
app.get('/all-todo', (request, response) => {

    const message = !todos.length ? "Todos Is Empty" : "This Is All Todos"

    response.send({
        data: todos,
        message: message
    })
});

// Todo Add
app.post('/add-todo', (request, response) => {

    const obj = {
        todoContent: request.body.todoContent,
        id: String(new Date().getTime()),
    }

    todos.push(obj)
    response.send({
        message: "todo added",
        data: obj
    });
})

// Todo Edit
app.patch('/edit-todo/:id', (request, response) => {

    const id = request.params.id;

    let isFound = false
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos[i].todoContent = request.body.todoContent;
            isFound = true
            break;
        }

    };

    if (isFound) {
        response.status(201).send({
            data: {
                todoContent: request.body.todoContent,
                id: id
            }, message: "Todo Added Successfully"
        })
    } else {
        response.status(200).send({ data: null, message: "Todo Not Found" });
    }

});

// Todo Delete
app.delete('/delete-todo/:id', (request, response) => {

    const id = request.params.id;

    let isFound = false
    for (let i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            isFound = true
            break;
        }

    };

    if (isFound) {
        response.status(201).send({ message: "Todo Delete Successfully" })
    } else {
        response.status(200).send({ data: null, message: "Todo Not Found" });
    }

});

// No Response
app.use('/', (reqwest, response) => {
    response.status(404).send("No Route Found");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})