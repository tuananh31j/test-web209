import './GlobalStyles.scss';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-toastify/dist/ReactToastify.css';
type GlobalStylesProps = {
    children: React.ReactElement;
};

const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
    return children;
};

export default GlobalStyles;
