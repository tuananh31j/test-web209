import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShowValidate from '~/components/ShowValidate';
import { useContext } from 'react';
import { AuthContext } from '~/context/Auth';
const loginSchema = z.object({
    email: z.string().email('Dinh dang email khong dung!'),
    password: z.string().nonempty('Yeu cau nhap password!'),
});
type ILoginForm = z.infer<typeof loginSchema>;
const Login = () => {
    const navigater = useNavigate();
    const { token, setToken } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({ resolver: zodResolver(loginSchema) });
    const { mutateAsync } = useMutation({
        mutationFn: (body: ILoginForm) =>
            axios.post<{ accessToken: string; user: { id?: string; name: string; email: string; password?: string } }>(
                'http://localhost:3000/login',
                body
            ),
        onSuccess: (data) => {
            localStorage.setItem('accessToken', data.data.accessToken);
            setToken(data.data.accessToken);
        },
    });
    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        console.log(data);
        await mutateAsync(data);
        navigater('/products');
        toast.success('Dang nhap thanh cong!');
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3'>
                    <label htmlFor='exampleInputEmail1' className='form-label'>
                        Email
                    </label>
                    <input
                        {...register('email')}
                        type='email'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                    />
                    <ShowValidate error={errors.email} />
                </div>
                <div className='mb-3'>
                    <label htmlFor='exampleInputEmail1' className='form-label'>
                        Password
                    </label>
                    <input
                        {...register('password')}
                        type='password'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                    />
                    <ShowValidate error={errors.password} />
                </div>

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
