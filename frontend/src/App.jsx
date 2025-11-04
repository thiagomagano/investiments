import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  function getUser() {
    fetch("http://localhost:3000/api/user/1")
          .then((res) => res.json())
          .then((data) => {
            setUser(data);
          })
          .catch((err) => {
            console.error("Erro ao buscar usuários:", err);
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
      <h2>Bem vindo! {user.nome }</h2>
    </div>
  );
}

export default App;
