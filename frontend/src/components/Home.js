import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';

const Home = () => {
    return(
        <div>
            <Fragment>
                <Helmet>
                    <title>Cart and Checkout Demo</title>
                </Helmet>

                <div className='mt-4 p-5 bg-primary text-white rounded'>
                    <h1>Cart and Checkout Demo</h1>
                    <p>Lorem Ipsum...</p>
                </div>
            </Fragment>
        </div>
    )
};

export default Home;