import React from "react";
import "./card.css";
import FormDialog from "../dialog/dialogForm";

export default function Card(props){
    const [open, setOpen] = React.useState(false);

    return(
        <>
        <FormDialog
            open={open}
            setOpen={setOpen}
            tarefa={props.tarefa}
            prioridades={props.prioridades}
            dia={props.dia}
            horario={props.horario}
            //total={props.total}
            listCard={props.listCard}
            setListCard={props.setListCard}
            id={props.id}
        />

        <div className="card-container" onClick={() => setOpen(true)}>
            <h1 className="card-title">{props.tarefa}</h1>
            <p className="card-id">{props.id}</p>
            <p className="card-category">{props.prioridade}</p>
            <p className="card-qtd">{props.dia}</p>
            <p className="card-cost">{props.horario}</p>
            
        </div>
    </>
    );
}
