import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { IPro } from '~/types';
import swal from 'sweetalert';
const ListProducts = () => {
    const productQuery = useQuery({
        queryKey: ['products'],
        queryFn: () => axios.get<IPro[]>('http://localhost:3000/products'),
    });
    const pr = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (id: string) => axios.delete(`http://localhost:3000/products/${id}`),
        onSuccess: () => {
            pr.invalidateQueries({ queryKey: ['products'] });
        },
    });
    const handleDelete = (id: string) => {
        swal({
            title: 'Are you sure?',
            icon: 'warning',
            buttons: ['hut', 'ok'],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                mutate(id);
            }
        });
    };
    return (
        <div>
            <Link className='tt-rounded-md tt-border tt-bg-green-800 tt-p-4 tt-text-white' to={'/product/add'}>
                Them san pham
            </Link>
            <table className='table table-bordered border-primary tt-my-10'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>title</th>
                        <th>Price</th>
                        <th>Img</th>
                        <th>des</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productQuery.data?.data.map((item, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>
                                <img className='tt-h-10 tt-w-10' src={item.img} alt='' />
                            </td>
                            <td>{item.des}</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className='tt-rounded-md tt-border tt-bg-red-800 tt-p-4 tt-text-white'
                                >
                                    xoa
                                </button>
                                <Link
                                    className='tt-rounded-md tt-border tt-bg-gray-800 tt-p-4 tt-text-white'
                                    to={`/product/edit/${item.id}`}
                                >
                                    sua
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListProducts;
