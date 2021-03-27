import ClickCounter from './ClickCounter';
import Machine from './Machine';
import './App.css';

function App() {
  return (
    <div>
    <h1>Hello React!</h1>
    <ClickCounter />
    <Machine name='Первая машина' />
    <Machine name='Вторая машина' />
    </div>
  );
}
export default App;
