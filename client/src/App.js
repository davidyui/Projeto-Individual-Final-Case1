import React, {useEffect, useState} from "react";
import './App.css';
import Axios from "axios";
import Card from "./components/cards/cards";

function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/registro", {
      tarefa: values.tarefa,
      prioridades: values.prioridades,
      dia: values.dia,
      horario: values.horario,
      //total: values.qtd * values.cost,
    }).then(() => {
      Axios.post("http://localhost:3001/buscar", {
      tarefa: values.tarefa,
      prioridades: values.prioridades,
      dia: values.dia,
      horario: values.horario,
        //total: values.qtd * values.cost,
    }).then((response) => {
      setListCard([
        ...listCard,
        {
          id: response.data[0].id,
          tarefa: values.tarefa,
          prioridades: values.prioridades,
          dia: values.dia,
          horario: values.horario,
          //total: values.qtd * values.cost,
        },
      ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getTarefas").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.tarefa]: value.target.value,
    }));
  };



  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-tittle">Loja de Games</h1>

        <input type="text" name="name" placeholder="Tarefas diárias" className="register-input" onChange={handleaddValues} />

        <input type="text" name="category" placeholder="Prioridades-alta-média-baixa" className="register-input" onChange={handleaddValues} />

        <input type="text" name="qtd" placeholder="dia" className="register-input" onChange={handleaddValues} />

        <input type="text" name="cost" placeholder="Horário" className="register-input" onChange={handleaddValues} />

        <button onClick={handleRegisterGame} className="register-button">Cadastrar</button>
      </div>

      {listCard.map((val) => (
        <Card 
          listCard={listCard} 
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          tarefa={val.tarefa}
          prioridades={val.prioridades}
          dia={val.dia}
          horario={val.horario}
          //total={val.total}
        />
      ))}
    </div>
  );
}

export default App;
