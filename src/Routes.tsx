import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Canvas from './pages/Canvas'
import LoginPage from './pages/login';
const AppRoutes = () => {

    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Canvas />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes