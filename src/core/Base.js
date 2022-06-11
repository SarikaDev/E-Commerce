import React from 'react';
import Menu from './Menu';
const Base = ({ title = 'mytitle', description = 'my description', className = ' text-white p-4', children }) => {
    return (
    <>
            <Menu/>
            <header className='container-fluid mt-2' >

                <div className='jumbotron  text-white text-center'>
                    <h3 style ={{fontFamily: 'Alegreya Sans'}} className='display-4 '>{title}</h3>
                    <h4 style={{fontFamily:'Signika'}}className='lead'>{description}</h4>
                </div>
            </header>
                <div className={className}>{children}</div>

            <footer className=' footer mt-auto py-3 '>
                <div className=' container-fluid bg-default text-white text-center py-3' style={{boxShadow:"2px 2px 2px black , -2px -2px 2px white"}}>
                    <h4 >Online Shopping Store</h4>
                    <button className='btn btn-info btn-md text-white' style={{borderRadius:'5px'}} >Contact us</button>
                </div>
                <div className='container'>
                    <span className='text-muted ' style={{fontWeight:'bolder'}}>Amazing place to <span className='text-white'>BUY</span> what you Love</span>
                </div>
            </footer>
    </>

        )
}

export default Base;