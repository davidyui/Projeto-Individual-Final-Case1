const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "agenda",
});

app.use(express.json());
app.use(cors());

app.post("/registro", (req, res) => {
    const { tarefa } = req.body;
    const { prioridades } = req.body;
    const { dia } = req.body;
    const { horario } = req.body;
    
    let mysql = "INSERT INTO tarefas ( tarefa, prioridades, dia, horario) VALUES (?, ?, ?, ?)";
    db.query(mysql, [tarefa, prioridades, dia, horario ], (err, result) => {
        res.send(result);
    });
});

app.post("/buscar", (req, res) => {
    const { tarefa } = req.body;
    const { prioridades } = req.body;
    const { dia } = req.body;
    const { horario } = req.body;
    
    let mysql = "SELECT * FROM tarefas WHERE tarefa = ? AND prioridades = ? AND dia = ? AND horario = ?";
    db.query(mysql, [tarefa, prioridades, dia, horario ], (err, result) => {
        if (err) res.send(err);
        res.send(result);
    });
});

app.get("/getTarefas", (req, res) => {
    let mysql = "SELECT * FROM tarefas";
    db.query(mysql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.put("/editar", (req, res) => {
    const { id } = req.body;
    const { tarefa } = req.body;
    const { prioridades } = req.body;
    const { dia } = req.body;
    const { horario } = req.body;
    
    let mysql = "UPDATE tarefas SET tarefa = ?, prioridades = ?, dia = ?, horario = ? WHERE id = ?";
    db.query(mysql, [tarefa, prioridades, dia, horario, id], (err, result) => {
        if (err) {
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let mysql = "DELETE FROM tarefas WHERE id = ?";
    db.query(mysql, id, (err, result) => {
        if (err) {
            console.log(err);
        }
        else{
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("Rodando o Servidor na Porta 3001");
})