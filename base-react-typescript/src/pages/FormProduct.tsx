import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';

const productSchema = z.object({
    title: z.string().nonempty('Khong duoc bo trong!'),
    price: z.number({ invalid_type_error: 'Du lieu khong hop le!', required_error: 'Bat buoc nhap!' }),
    img: z.string().nonempty('Khong duoc bo trong!'),
    des: z.string().nonempty('Khong duoc bo trong!'),
});
type IProForm = z.infer<typeof productSchema>;
const FormProduct = () => {
    const navigater = useNavigate();
    const { id } = useParams();
    const queryClient= useQueryClient();
    const productMutaionAdd = useMutation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IProForm>({ resolver: zodResolver(productSchema) });
    const onSubmit: SubmitHandler<IProForm> = async (data) => {
        console.log(data);
    };
    return (
        <div>
            <form>
                <div className='mb-3'>
                    <label htmlFor='exampleInputEmail1' className='form-label'>
                        Email address
                    </label>
                    <input type='email' className='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' />
                    <div id='emailHelp' className='form-text'>
                        We'll never share your email with anyone else.
                    </div>
                </div>

                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default FormProduct;
