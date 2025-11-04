import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [ativos, setAtivos] = useState([]);
  const [loading, setLoading] = useState(false);

  function getUser() {
    fetch("http://localhost:3000/api/ativos")
          .then((res) => res.json())
          .then((data) => {
            setAtivos(data);
          })
          .catch((err) => {
            console.error("Erro ao buscar ativos:", err);
          })
          .finally(() => {
            setLoading(false);
          });
  }

  useEffect(() => {
    getUser();
  }, [])

  if (loading) return <p>Carregando..</p>;

    return (
    <div>
      <h1>App de investimentos!</h1>
      <h2>Acompanhe seus ativos:</h2>
      <table>
        <th>Nome</th>
        <th>Valor de compra</th>
        <th>Qtd</th>
        <th>Total</th>
        <th>Deletar</th>
          {ativos.map(atv => {
            return (
              <tr key={atv.id}>
                <td>{atv.nome}</td>
                <td>{atv.valor_compra}</td>
                <td>{atv.quantidade}</td>
                <td>{(atv.quantidade * atv.valor_compra).toFixed()}</td>
                <td><button>Excluir</button></td>
              </tr>
            )})}
      </table>
    </div>
  );
}

export default App;
