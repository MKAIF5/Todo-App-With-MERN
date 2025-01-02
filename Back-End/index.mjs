import express from 'express'

const app = express()
const port = 3000

const todos = [];

app.use(express.json())


// Todo Get
app.get('/all-todo', (request, response) => {
    response.send(todos)
});

// Todo Add
app.post('/add-todo', (request, response) => {
    todos.push(request.body.todo)
    response.send("todo added");
})

// Todo Edit
app.patch('/edit-todo/:id', (request, response) => {
       
});

app.delete('/delete-todo/:id', (request, response) => {
       
});

// No Response
app.use('/' , (reqwest , response) =>{
    response.status(404).send("No Route Found");
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})