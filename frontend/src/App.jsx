import "./App.css";
import { useAtivos } from "./hooks/useAtivos";

function App() {
  const {data, isLoading,  error} = useAtivos();

  if (isLoading) return <p>Carregando..</p>;
  if (error) return <p>Erro ao carregador os dados do servidor.</p>;

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
                <td>R$ {ativo.valor_compra}</td>
                <td>{ativo.quantidade}</td>
                <td>R$ {(ativo.quantidade * ativo.valor_compra)}</td>
                <td><button>Excluir</button></td>
              </tr>
            )})}
      </tbody>
      </table>
    </div>
  );
}

export default App;
