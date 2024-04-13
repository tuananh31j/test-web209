import { useRoutes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Routes from './routes/Routes';
function App() {
    const router = useRoutes(Routes);
    return (
        <>
            {router}
            <ToastContainer />
        </>
    );
}

export default App;
