import React from 'react';

import Wrapper from '../../form/wrapper';
import Input from '../../form/input';
import Textarea from '../../form/textarea'

const MyForm = props => {
  const { onChange, onSubmit, data, errors = {}} = props;
  
  return (<form onSubmit={onSubmit}>
    <Wrapper name="myinput" errors={errors}><Input name="myinput" value={data.myinput} onChange={onChange}/></Wrapper>
    <Wrapper name="myinput2" errors={errors}><Input name="myinput2" value={data.myinput2} onChange={onChange}/></Wrapper>
    <Wrapper name="myinput3" errors={errors}><Textarea name="myinput3" value={data.myinput3} onChange={onChange}/>
      <div className="invalid-feedback">fgfdds</div>
    </Wrapper>
    <button type="submit">Submit</button>
  </form>);
}

export default MyForm;