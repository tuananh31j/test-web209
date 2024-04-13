import React from 'react';
import { FieldError } from 'react-hook-form';

const ShowValidate = ({ error }: { error?: FieldError }) => {
    return (
        <div id='emailHelp' className='form-text'>
            <p className='tt-text-red-800'>{error && error.message}</p>
        </div>
    );
};

export default ShowValidate;
