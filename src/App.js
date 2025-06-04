import { Routes, Route } from 'react-router-dom';
import Header from "./pages/header/Header"
import './App.css';
import Dashboard from './pages/dashboar/Dashboard';
import PostUser from './pages/student/PostUser';
import NoMatch from './pages/noMatch/NoMatch';
import UpdateUser from './pages/student/UpdateUser';

function App() {
  return(
<>
      <Header/>
        <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/student' element={<PostUser />}/>
        <Route path='/student/:id' element={<UpdateUser/>}/>
        <Route path='*' element={<NoMatch />}/>
      </Routes>
    </>
  );
}
  




export default App;
