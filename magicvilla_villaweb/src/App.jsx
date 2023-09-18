import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
    const [Villas, SetVillas] = useState([]);

    const addButtonRef = useRef();
    const cancelButtonRef = useRef();
    const formRef = useRef();

    //ADD VILLA REF
    const nameRef = useRef();
    const occupancyRef = useRef();
    const imageUrlRef = useRef();
    const detailsRef = useRef();

    useEffect(() => {
        fetch("https://localhost:7151/api/VillaAPI").then(res => res.json()).then(data => {
            SetVillas(data)
        })
    }, []);

    const addVilla = () => {
        cancelButtonRef.current.classList.remove("hidden");
        formRef.current.classList.remove("hidden");
        addButtonRef.current.classList.add("hidden");
    }

    const cancelAddingVilla = () => {
        cancelButtonRef.current.classList.add("hidden");
        formRef.current.classList.add("hidden");
        addButtonRef.current.classList.remove("hidden");
    }

    const addVillaHandler = (e) => {
        e.preventDefault();

        fetch("https://localhost:7151/api/VillaAPI", {
            method: "POST",
            body: JSON.stringify({
                name: nameRef.current.value,
                sqft: 600,
                occupancy: occupancyRef.current.value,
                imageUrl: imageUrlRef.current.value,
                details: detailsRef.current.value,
                rate: 100
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then("Villa Added succesfully!");
    }

  return (
    <>
          <h1>Welcome to Magic Villa</h1>
          <div className="app_container buttons">
              <button ref={addButtonRef} onClick={addVilla}>Add villa</button>
              <button ref={cancelButtonRef} onClick={cancelAddingVilla} className="remove_btn hidden">Cancel</button>
          </div>
          <form ref={formRef} className="hidden" onSubmit={addVillaHandler}>
                  <label>
                  <span>Name:</span>
                  <input ref={nameRef} type="text" required />
                    </label>
                    <label>
                  <span>Occupancy:</span>
                  <input ref={occupancyRef} type="number" required />
              </label>
              <label>
                  <span>Image URL:</span>
                  <input ref={imageUrlRef} type="text" required />
              </label>
              <label>
                  <span>Details:</span>
                  <textarea ref={detailsRef} required></textarea>
              </label>
              <button>Add</button>
              </form>
          <div className="app_container">
              <div className="villas_container">
                  {Villas && Villas.map(v => {
                      return (<div className="villa_container" key={v.id}>
                          <img width="300px" src={v.imageUrl} />
                          <div className="info_container">
                              <p><b>Name:</b> {v.name}</p>
                              <p><b>Occupancy:</b> {v.occupancy}</p>
                          </div>
                          <p><b>Details:</b></p>
                          <p>{v.details}</p>
                          <button className="remove_btn">Remove</button>
                      </div>)
                  })}
              </div>
          </div>
         
    </>
  )
}

export default App
