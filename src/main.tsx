import React from 'react'
import ReactDOM from 'react-dom/client'
import GnarlyDatePicker from './GnarlyDatePicker.tsx'
import './index.css'

const App = () => {
    return (
        <React.StrictMode>
            <GnarlyDatePicker />
        </React.StrictMode>
    );
};

export {App, GnarlyDatePicker}; // Export the default component

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

