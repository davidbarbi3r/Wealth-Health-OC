import React from 'react'
import ReactDOM from 'react-dom/client'
import {GnarlyDatePicker} from './GnarlyDatePicker'
import './index.css'

const App = () => {
    const [date, setDate] = React.useState<string>("1990-01-01")
    return (
        <React.StrictMode>
            <GnarlyDatePicker date={date} setDate={setDate}/>
        </React.StrictMode>
    );
};

export default App; // Export the default component

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

