
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntryScreen from './screens/EntryScreen';
import Login from './components/Login';
import Register from './components/Register';
import ProfileScreen from './screens/ProfileScreen';
import NewPostScreen from './screens/NewPostScreen';
import EditPostScreen from './screens/EditPostScreen';
// import EntryList from './components/EntryList';


function App() {
 

  return (
    <Router>
      <Header />
    <div className='App'>
    <Routes>

               <Route path="/login" element={<Login />}/>
               <Route path="/register" element={<Register />}/>
               <Route path="/profile" element={<ProfileScreen />}/>
               <Route path="/entry/:id" element={<EntryScreen />}/>
               {/* <Route path="/entrylist" element={<EntryList />}/> */}
               <Route path="/entry/:id/new" element={<NewPostScreen />}/>
               <Route path="/entry/:id/edit" element={<EditPostScreen />}/>
               <Route path='/search/:keyword' element={<HomeScreen />} />
               <Route exact path='/' element={<HomeScreen />} />
        
        </Routes>
    </div>
    </Router>
  );
}

export default App;
