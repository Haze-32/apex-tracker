import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthProvider } from './utilities/AuthContext';
import MainComponent from './components/main'





function App() {

  return (
    <AuthProvider>
      <div className="App">
        <MainComponent />
      </div>
    </AuthProvider>
  );
}

export default App;
