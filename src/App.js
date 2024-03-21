import './App.css';
import { useState } from 'react';
import Project from './component/project';


function App() {

  const [ isDarkMode, setIsDarkMode ] = useState(false);
  
  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  }

  
  return (
    <div>
        <Project isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
    </div>
  );
}

export default App;
