import React, { useState ,useCallback} from 'react';
import Base from '../core/Base';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../auth/helper';
import { Form, Label, InputGroup, Input, Button, FormGroup } from 'reactstrap';

const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: null,
        success: null,
    });
    const { email, password, error, success } = values;

    const navigate = useNavigate();


    const handleChange = useCallback(e => {
        setValues((prev)=> ({ ...prev, [e.target.name]: e.target.value, error: false, success: false }));

    },[])

    const sendMessage = useCallback(() => {
        return (
            <>
                <div className='row'>
                    <div className='col-md-6 offset-sm-3 text-center'>
                        <div className='alert alert-success' style={{ display: success ? 'block' : 'none', }}>Signin Done successfully , Redirect to {<Link to="/">Home Page</Link>} </div>
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
    },[error])

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        signin({ email, password })
            .then((data) => {
                if (data.err || data.errmsgs) {
                    setValues((prev)=>( { ...prev, error: (data.err || data.errmsgs.map((da) => da.msg)), success: false }))
                }
                else if (data.token) {
                    setValues((prev)=>( { ...prev, error: false, success: true }) )
                    localStorage.setItem('jwt', JSON.stringify(data));
                    console.log(data)
                    if (data && data.user.role === 1) { navigate('/adminDashboard') }
                    else { navigate('/userDashboard') };
                }
            })
    },[email, navigate, password])


    const signinForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text-left' >
                    {sendMessage()}
                    {errorMessage()}

                    <Form onSubmit={onSubmit}>

                        <FormGroup className='form-group'>
                            <Label className='text-light'>Email</Label>
                            <InputGroup>
                                <Input className='form-control mt-2' onChange={handleChange} type='email' name='email' required />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className='form-group'>
                            <Label className='text-light'>Password</Label>
                            <InputGroup>
                                <Input className='form-control mt-2' onChange={handleChange} name='password' type='password' />
                            </InputGroup>
                        </FormGroup>
                        <Button className=' btn btn-success mt-3' style={{ width: '100%' }}>Sumit</Button>
                    </Form>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Base title='Sign in ' description='A page for user to Sign In !!!' >
                {signinForm()}
                <div className="w-100 text-center mt-4">
                    Need an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Base>
        </div>
    )
}

export default Signin;




