const Todo = require('../models').Todo
const TodoItem = require('../models').TodoItem

module.exports = {
    create(req, res) {
        return Todo
            .create({
                title: req.body.title,
            })
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error))
    },

    list(req, res) {
        return Todo
            .findAll({
                order:[
                    ['id'],
                ],
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }],
            })
            .then(todos => res.status(200).send(todos))
            .catch(error => res.status(400).send(error))
    },

    detail(req, res) {
        return Todo
            .findById(req.params.todoId, {
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }]
            })
            .then(todo => {
                if(!todo) {
                    return res.status(404).send({
                        message: 'todo not found',
                    })
                }
                return res.status(200).send(todo)
            })
            .catch(error => res.status(404).send(error))
    },

    update(req, res) {
        return Todo
            .findById(req.params.todoId, {
                include: [{
                    model: TodoItem,
                    as: 'todoItems',
                }]
            })
            .then(todo => {
                if(!todo) {
                    return res.status(404).send({
                        message: 'todo not found',
                    })
                }
                return todo
                    .update({
                        title: req.body.title || todo.title,
                    })
                    .then(() => res.status(200).send(todo))
                    .catch((error) => res.status(400).send(error))
            })
            .catch((error) => res.status(400).send(error))
    },

    destroy(req, res) {
        return Todo
            .findById(req.params.todoId)
            .then(todo => {
                if(!todo) {
                    return res.stauts(400).send( {
                        message: 'todo not found'
                    })
                }
                return todo
                    .destroy()
                    .then(() => res.stauts(204).send())
                    .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error))
    }
}