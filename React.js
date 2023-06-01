import { useState, useEffect, useRef } from 'react';
import { createConnection } from './chat.js';
import './App.css';

const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]);

  return <h2>Olá</h2>;
}

export default function App() {
  const [roomId, setRoomId] = useState('Escolha a Sala');
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <>
      <header>
        <h1>ChatJD</h1>
      </header>
      <body>
        <label>
          Escolha a Sala{' '}
          <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            <option value="SQL">SQL</option>
            <option value="Programação">Programação</option>
            <option value="HelpDesk">HelpDesk</option>
          </select>
        </label>
        <button onClick={() => setShow(!show)}>
          {show ? 'Fechar chat' : 'Abrir chat'}
        </button>
        {show && <hr />}
        {show && <ChatRoom roomId={roomId} />}
      </body>
      
      <footer>
        <p>ChatJD</p>
      </footer>
    </>
  );
}
