import { useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {

  const {data, isLoading } = useQuery({
    queryKey: ['ativos'],
    queryFn: getAtivos
  });

  async function getAtivos() {
    const data = await fetch("http://localhost:3000/api/ativos")
    return data.json();
  }

  if (isLoading) return <p>Carregando..</p>;

    return (
    <div className="tabela-ativos-container">
      <h1>Confira seus ativos:</h1>
      <table className="tabela-ativos">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Valor de compra</th>
          <th>Qtd</th>
          <th>Total</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
          {data.map(ativo => {
            return (
              <tr key={ativo.id}>
                <td>{ativo.nome}</td>
                <td>{ativo.valor_compra}</td>
                <td>{ativo.quantidade}</td>
                <td>{(ativo.quantidade * ativo.valor_compra).toFixed()}</td>
                <td><button>Excluir</button></td>
              </tr>
            )})}
      </tbody>
      </table>
    </div>
  );
}

export default App;
