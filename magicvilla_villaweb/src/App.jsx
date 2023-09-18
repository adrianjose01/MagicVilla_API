import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [Villas, SetVillas] = useState([]);

    useEffect(() => {
        fetch("https://localhost:7151/api/VillaAPI").then(res => res.json()).then(data => {
            console.log(data)
            SetVillas(data)
        })
    },[])

  return (
    <>
      <h1>Welcome to Magic Villa</h1>
          <h2>Here you will see Information about villas</h2>
          {Villas && Villas.map(v => {
              return (<div key={v.id}>
                  <p>Name: {v.name}</p>
                  <p>Occupancy: {v.occupancy}</p>
                  <img width="300px" src={v.imageUrl} />
              </div>)
          })}
    </>
  )
}

export default App
