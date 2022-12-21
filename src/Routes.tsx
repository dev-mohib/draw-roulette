import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Canvas from './pages/Canvas'
import LoginPage from './pages/login';
import Authorize from './pages/authorize';
import Callback from './pages/authorize/callback';
import Auth from './pages/authorize/auth'
import OAuth from './pages/authorize/OAuth';
const AppRoutes = () => {
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Canvas />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/authorize" element={<Authorize />}/>
            <Route path='/callback' element={<Callback />}/>
            <Route path='/auth' element={<Auth />}  />
            <Route path='/oauth' element={<OAuth />}  />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes