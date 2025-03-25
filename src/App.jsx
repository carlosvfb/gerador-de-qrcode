import { useState } from 'react'
import './App.css'

function App() {
  const [nomeMusica, setNomeMusica] = useState("")
  const [artista, setArtista] = useState("")
  const [dadosMusica, setDadosMusica] = useState(null)
  const [erro, setErro] = useState("")

  const handleGerarQRCode = async () => {
    if (!nomeMusica.trim() || !artista.trim()) {
      setErro("Por favor, preencha o nome da música e o nome do artista.")
      return;
    }

    try {
      const response = await fetch(`https://servidor-hinario.vercel.app/musicas/${encodeURIComponent(nomeMusica)}/${encodeURIComponent(artista)}/qrcode`)

      if (!response.ok) {
        throw new Error(`Falha ao gerar QR Code: ${response.status}`)
      }

      const data = await response.json()
      setDadosMusica(data)
      setErro("");
    } catch (error) {
      setErro(error.message)
      setDadosMusica(null)
    }
  }

  return (
    <div>
      <h1>Gerador de QR Code</h1>
      
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="nomeMusica">Nome da Música: </label>
        <input 
          id="nomeMusica"
          type="text" 
          placeholder="Digite o nome da música" 
          onChange={(e) => setNomeMusica(e.target.value)}
        />
      </div>
      
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="artista">Nome do Artista: </label>
        <input 
          id="artista"
          type="text" 
          placeholder="Digite o nome do artista" 
          onChange={(e) => setArtista(e.target.value)}
        />
      </div>

      <button onClick={handleGerarQRCode}>Gerar QR Code</button>

      {erro && <p>{erro}</p>}

      {dadosMusica && (
        <div>
          <h3>QR Code da Música {dadosMusica.nome} - {dadosMusica.artista}:</h3>
          <img src={dadosMusica.qrCode} alt={`QR Code de ${dadosMusica.nome} de ${dadosMusica.artista}`} />
        </div>
      )}
    </div>
  )
}

export default App
