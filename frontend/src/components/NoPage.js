import React, {Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {} from 'reactstrap';

const NoPage = () => {
    return(
        <div>
            <Fragment>
                <Helmet>
                    <title>404: Page Not Found</title>
                </Helmet>

                <div className='mt-4 p-5 bg-primary text-white rounded'>
                    <h1>404: Page Not Found</h1>
                    <p>Lorem Ipsum...</p>
                </div>
            </Fragment>
        </div>
    )
};

export default NoPage;