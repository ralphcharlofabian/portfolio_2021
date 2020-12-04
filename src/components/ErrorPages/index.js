import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Layout, Result, Button } from 'antd';


//constants
import { routes } from '../../common/constants/routes';


const ErrorPage = () => {


    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">
          <Link to={routes.LOGIN_PAGE}> 
              Back to Login
            </Link> 
          </Button>}
      />
      );
}

export default ErrorPage;