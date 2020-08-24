import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Input from "../form/input";
import InputNumber from "../form/number-input";
import MyBoolean from "../form/boolean";
import Checkbox from "../form/checkbox";
import Select from "../form/select";
import MultiSelect from "../form/multiselect";
import Typeahead from "../form/typeahead";
import Datepicker from "../form/date";
import Textarea from "../form/textarea";
import Wrapper from "../form/wrapper";

const options = [
  { id: 1, name: "apple" },
  { id: 2, name: "banana" },
  { id: 3, name: "orange" },
];

class Layout extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4" style={{ marginLeft: "20pt" }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

storiesOf("Form", module)
  .add("boolean", () => (
    <MyBoolean name="myboolean" onChange={action("clicked")} />
  ))
  .add("checkbox", () => (
    <Checkbox name="mycheckbox" onChange={action("clicked")} />
  ))
  .add("date", () => (
    <Layout>
      <Datepicker name="mydate" onChange={action("clicked")} />
    </Layout>
  ))
  .add("input", () => (
    <Layout>
      <Input name="myinput" onChange={action("clicked")} />
    </Layout>
  ))
  .add("input number disabled", () => (
    <Layout>
      <InputNumber
        disabled
        value="345"
        type="kPrice"
        name="mynumber"
        onChange={action("clicked")}
      />
    </Layout>
  ))
  .add("input number", () => (
    <Layout>
      <InputNumber value="346" name="mynumber" onChange={action("clicked")} />
    </Layout>
  ))
  .add("input number undefined", () => (
    <Layout>
      <InputNumber
        value={undefined}
        name="mynumber"
        onChange={action("clicked")}
      />
    </Layout>
  ))
  .add("select", () => (
    <Layout>
      <Select name="myselect" options={options} onChange={action("clicked")} />
    </Layout>
  ))
  .add("select multi", () => (
    <Layout>
      <MultiSelect
        name="myselect"
        options={options}
        onChange={action("clicked")}
      />
    </Layout>
  ))
  .add("typeahead", () => (
    <Layout>
      <Typeahead
        name="mytypeahead"
        options={options}
        onChange={action("clicked")}
      />
    </Layout>
  ))
  .add("textarea", () => (
    <Layout>
      <Textarea name="mytextarea" onChange={action("clicked")} />
    </Layout>
  ))
  .add("wrapper", () => (
    <Layout>
      <br />
      <Wrapper mandatory label="sdf" info="my info" name="mywrapper">
        inside of wrapper
      </Wrapper>
    </Layout>
  ));
