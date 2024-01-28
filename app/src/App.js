import { useEffect, useState } from 'react';
import './App.css';
import EntryList from "./components/EntryList";

function App() {
    const [subject, setSubject] = useState('i347 - UTILISER UN SERVICE AVEC DES CONTENEURS')
    
    function updateSubjectClick() {
        document.getElementById('subject-title-and-edit').style.display = 'none';
        document.getElementById('subject-edit').style.display = '';
    }

    useEffect(() => {
        async function fetchSubjectName() {
            fetch('http://localhost:4000/subject', {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                setSubject(data.name)
            })
        }
        fetchSubjectName()
    }, [])

    const setNewSubject = async(subjectValue) => {
        subjectValue.preventDefault()
        await fetch('http://localhost:4000/subject', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: subjectValue.target.elements['subject-input'].value
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.message) {
                return alert(`An error occured : ${data.message}`)
            } else {
                setSubject(subjectValue.target.elements['subject-input'].value)

                document.getElementById('subject-title-and-edit').style.display = '';
                document.getElementById('subject-edit').style.display = 'none';
            }
        })

    }
  return (
    <main className={'container my-5'}>
        <div className={'row justify-content-center'}>
            <div className={'col-md-8'}>
                <div>
                    <h1>Calculateur de moyenne</h1>
                    <p>Entrez vos notes et l'intitulé de l'examen ci-dessous pour calculer la moyenne</p>
                </div>
                <div className={'py-4'}>
                    <div id="subject">
                        <div id="subject-title-and-edit">
                            <h5>Matière : {subject} &nbsp;
                            <button className={'btn btn-primary'} type="button" onClick={updateSubjectClick}>
                                <i className="fa-solid fa-pencil"></i>
                            </button>
                            </h5>
                        </div>
                        <div id="subject-edit" style={{ display: 'none' }}>
                            <form onSubmit={setNewSubject}>
                                <input id="subject-input" type="text" placeholder='Titre de la matière'></input>&nbsp;
                                <button className={'btn btn-success'} type="submit">
                                    <i className="fa-solid fa-check"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    <h6>Professeur(e) : MME. GETAZ</h6>
                    <EntryList/>
                </div>
            </div>
        </div>
    </main>
  );
}

export default App;
