
import { useState } from 'react'
import './App.css'
function App() {
  const [nomeMusica, setNomeMusica] = useState("")
  const [dadosMusica, setDadosMusica] = useState(null)
  const [erro, setErro] = useState("")

  const handleGerarQRCode = async () => {
    if (!nomeMusica.trim()) {
      setErro("Por favor, preencha o nome da música")
      return;
    }

    try {
      const response = await fetch(`https://servidor-hinario.vercel.app/musicas/${encodeURIComponent(nomeMusica)}/qrcode`)

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
      <div>
        <input type="text" placeholder="Digite o nome da música" onChange={(e) => setNomeMusica(e.target.value)}/>
      </div>
      <button onClick={handleGerarQRCode}>Gerar QR Code</button>

      {erro && <p>{erro}</p>}

      {dadosMusica && (
        <div>
          
          <h3>QR Code da Música {dadosMusica.nome}:</h3>
          <img src={dadosMusica.qrCode} alt={`QR Code de ${dadosMusica.nome}`} />
        </div>
      )}

    </div>
  )
}

export default App
