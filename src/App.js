import React, { useEffect, useState } from "react";
import Clientes from "./components/table";

function App() {
  const [clients, setClients] = useState([
    { nome: "", documento: "", sexo: "", id: "" },
  ]);
  return (
    <div className="App">
      <Clientes clients={clients} setClients={setClients} />
    </div>
  );
}

export default App;
