import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";

export default function FormDialog(props){
    const [editValues, setEditValues] = useState({
        id: props.id,
        tarefa: props.tarefa,
        prioridade: props.prioridade,
        dia: props.dia,
        horario: props.horario,
        //total: props.qtd * props.cost,
    });

    const handleChangeValues = (values) => {
        setEditValues((prevValues) => ({
            ...prevValues,
            [values.target.id]: values.target.value,
        }));
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleEditGame = () => {
        Axios.put("http://localhost:3001/editar", {
            id: editValues.id,
            tarefa: props.tarefa,
            prioridades: props.prioridades,
            dia: props.dia,
            horario: props.horario,
            //total: editValues.qtd * editValues.cost,
        }).then(() => {
            props.setListCard(
                props.listCard.map((value) => {
                    return value.id == editValues.id ?
                    {
                        id: editValues.id,
                        tarefa: props.tarefa,
                        prioridade: props.prioridade,
                        dia: props.dia,
                        horario: props.horario,
                        //total: editValues.qtd * editValues.cost,
                    } : value;
                })
            );
        });
        handleClose();
    };

    const handleDeleteGame = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
            props.setListCard(
                props.listCard.filter((value) => {
                    return value.id != editValues.id;
                })
            );
        });
        handleClose();
    };

    return(
        <div>
            <Dialog open={props.open} onClose={handleClose}aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Editar</DialogTitle>
            
            <DialogContent>
                <TextField disabled margin="dense" id="id" label="id" defaultValue={props.id} type="text" fullWidth/>

                <TextField autofocus margin="dense" id="name" label="Tarefas diarias" defaultValue={props.tarefa} type="text" onChange={handleChangeValues} fullWidth/>

                <TextField autofocus margin="dense" id="category" label="Prioridades" defaultValue={props.prioridade} type="text" onChange={handleChangeValues} fullWidth/>

                <TextField autofocus margin="dense" id="qtd" label="Dia" defaultValue={props.dia} type="text" onChange={handleChangeValues} fullWidth/>

                <TextField autofocus margin="dense" id="cost" label="Horário" defaultValue={props.horario} type="text" onChange={handleChangeValues} fullWidth/>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">Cancelar</Button>

                <Button onClick={() => handleDeleteGame()} color="primary">Excluir</Button>

                <Button onClick={() => handleEditGame()} color="primary">Salvar</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}