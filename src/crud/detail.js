import React, { useState } from 'react';

import Form from './form';
import Toggle from '../components/toggle';
import DetailHoc from '../hoc/data/detail';

export default props => <DetailHoc Toggle={Toggle} Form={Form} {...props}/>;
