import MainLayout from '~/layouts/MainLayout';
import FormProduct from '~/pages/FormProduct';
import ListProducts from '~/pages/ListProducts';
import Login from '~/pages/Login';
import PrivateRouter from '~/pages/PrivateRouter';
import Register from '~/pages/Register';

const Routes = [
    {
        path: '',
        element: <MainLayout />,
        children: [
            { index: true, element: <>Home</> },
            {
                path: '/products',
                element: (
                    <PrivateRouter>
                        <ListProducts />
                    </PrivateRouter>
                ),
            },
            {
                path: '/product/add',
                element: (
                    <PrivateRouter>
                        <FormProduct />
                    </PrivateRouter>
                ),
            },
            {
                path: '/product/edit/:id',
                element: (
                    <PrivateRouter>
                        <FormProduct />
                    </PrivateRouter>
                ),
            },
            { path: '/register', element: <Register /> },
            { path: '/login', element: <Login /> },
        ],
    },
];

export default Routes;
