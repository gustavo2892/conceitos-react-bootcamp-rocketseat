import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';
import backgroundImage from './assets/image_example.jpg';
import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject() {
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Gustavo Vidal de Freitas"
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <img src={backgroundImage} width={100}/>
      <Header title="Homepage" >
        <ul>
          <li>Homepage</li>
          <li>Project</li>
        </ul>
      </Header>
      <Header title="Projects" >
        <ul>
          {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </ul>

        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
      </Header>
    </>
  );
}

export default App;