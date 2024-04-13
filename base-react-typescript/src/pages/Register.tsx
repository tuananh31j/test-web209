import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShowValidate from '~/components/ShowValidate';
const registerSchema = z.object({
    email: z.string().email('Dinh dang email khong dung!'),
    name: z.string().nonempty('Khong duoc bo trong!'),
    password: z.string().nonempty('Yeu cau nhap password!'),
});
type IRegisterForm = z.infer<typeof registerSchema>;
const Register = () => {
    const navigater = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterForm>({ resolver: zodResolver(registerSchema) });
    const { mutateAsync } = useMutation({
        mutationFn: (body: IRegisterForm) => axios.post('http://localhost:3000/register', body),
    });
    const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
        console.log(data);
        await mutateAsync(data);
        navigater('/login');
        toast.success('Dang ky thanh cong!');
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
                        Name
                    </label>
                    <input
                        {...register('name')}
                        type='text'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                    />
                    <ShowValidate error={errors.name} />
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

export default Register;
