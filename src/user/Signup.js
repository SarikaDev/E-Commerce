import React, { useState,useCallback } from 'react';
import Base from '../core/Base';
import { signUp } from '../auth/helper';
import { Link } from 'react-router-dom';
import { Form, Label, InputGroup, Input, Button, FormGroup } from 'reactstrap';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: null,
        success:null,
    });
    const { name, email, password, error, success } = values;



    const handleChange = useCallback((e) => {
        setValues((prev)=>( { ...prev, [e.target.name]: e.target.value, error: false, success: false }));

    },[]);

    const sendMessage = useCallback(() => {
        return (
            <>
                <div className='row'>
                    <div className='col-md-6 offset-sm-3 text-center'>
                        <div className='alert alert-success' style={{ display: success ? 'block' : 'none', }}>Account was created successfully {<Link to="/signin">Sign in</Link>} </div>
                    </div>
                </div>
            </>
        )
    },[success]);
    const errorMessage = useCallback(() => {
        return (
            <>
                <div className='row'>
                    <div className='col-md-6 offset-sm-3 text-center'>
                        <div className='alert alert-danger' style={{ display: error ? 'block' : 'none' }}> {error} </div>
                    </div>
                </div>
            </>
        )
    },[error]);

    const SignupForm = useCallback(() => {
        const onSubmit = (e) => {
            e.preventDefault();
            signUp({ name, email, password })
                .then((data) => {
                    if (data.err || data.errmsgs) {
                        setValues((prev)=>{return ({ ...prev, error: (data.err || data.errmsgs.map((da) => da.msg)), success: false })})
                    }
                    else {
                        setValues((prev)=>({ ...prev, error: false, success: true }))
                    }
                }).catch((error) => console.log(error));
        }


        return (
            <div className='row'>
                {sendMessage()}
                {errorMessage()}

                <div className='col-md-6 offset-sm-3 text-left' >
                    <Form onSubmit={onSubmit}>
                        <FormGroup className='form-group' >
                            <Label className='text-light'>Name</Label>
                            <InputGroup>
                                <Input className='form-control mt-2' onChange={handleChange} type='text' name='name' required />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className='form-group'>
                            <Label className='text-light'>Email</Label>
                            <InputGroup>
                                <Input className='form-control mt-2' onChange={handleChange} type='email' name='email' required />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className='form-group'>
                            <Label className='text-light'>Password</Label>
                            <InputGroup>
                                <Input className='form-control mt-2' onChange={handleChange} name='password' type='password' required />
                            </InputGroup>
                        </FormGroup>
                        <Button className=' btn btn-success mt-3' style={{ width: '100%' }}>Sumit</Button>
                    </Form>
                    <div className="w-100 text-center mt-4">
                        <p className='text-light '>
                            Already Have An Account  <Link to="/signin"> SIGN IN</Link>
                        </p>
                    </div>
                </div>
            </div>
        )
    },[email, errorMessage, handleChange, name, password, sendMessage])
    return (
        <div>
            <Base title='Register Now' description='A page for user to easy  Sign up !!!' >
                {SignupForm()}
            </Base>
        </div>
    )
}

export default Signup;