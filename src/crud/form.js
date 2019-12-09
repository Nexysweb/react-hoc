import React from 'react';

import FormHoc from '../hoc/data/form';
import Loader from '../components/loader';

export default props => <FormHoc Loader={Loader} {...props}/>
