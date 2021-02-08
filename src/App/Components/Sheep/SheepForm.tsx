import React from 'react';

import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';

import Select from 'react-select';
import { Sheep } from '../../Data';

interface Sex {
  label: string;
  value: string;
}

interface Branded {
  label: string;
  value: boolean;
}

interface FormValues {
  name: string;
  sex: Sex;
  branded: Branded
}

export const sheepSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Please enter at lease two characters.")
    .max(10, "No more than 10 characters are allowed.")
    .required("Please enter a name for this animal."),
  sex: Yup.object().shape({
    label: Yup.string().oneOf(['Male', 'Female']),
    value: Yup.string().oneOf(['male', 'female'])
  }).required("Please enter the sex of the animal."),
  branded: Yup.object().shape({
    label: Yup.string().oneOf(['Yes', 'No']),
    value: Yup.boolean()
  }).required("Please enter the sex of the animal.")
});

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, values, setFieldValue, setFieldTouched } = props;
  return (
    <Form>
      <div className="form-group">
        <label>Name</label><br />
        <Field name="name" />
        {errors.name && touched.name ? (
          <div className="invalid-feedback d-block">
            {errors.name}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label>Sex</label><br />
        <FormikSelect
          value={values.sex}
          name="sex"
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" }
          ]}
        />
        {errors.sex && touched.sex ? (
          <div className="invalid-feedback d-block">
            {errors.sex}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label>Branded</label><br />
        <FormikSelect
          value={values.branded}
          name="branded"
          onChange={setFieldValue}
          onBlur={setFieldTouched}
          options={[
            { label: "Yes", value: true },
            { label: "No", value: false }
          ]}
        />
        {errors.branded && touched.branded ? (
          <div className="invalid-feedback d-block">
            {errors.branded}
          </div>
        ) : null}
      </div>

      <button className="btn btn-primary" type="submit">Submit</button>{' '}
      <button className="btn btn-secondary">Cancel</button>
    </Form>
  );
};

interface Options {
  label: string;
  value: string | boolean;
}

interface FormikSelectProps {
  value: Sex | Branded;
  name: string
  onChange: Function;
  onBlur: Function;
  options: Array<Options>
}

class FormikSelect extends React.Component<FormikSelectProps, any> {
  
  render() {
    return (
      <Select
        value={this.props.value}
        options={this.props.options}
        onChange={value => this.props.onChange(this.props.name, value)}
        onBlur={() => this.props.onBlur(true)}
      />
    );
  }
}

interface Props {
  sheep: Sheep | null;
  toggleSheepModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
  submitSheep: Function;
  index: number;
}

const SheepForm = withFormik<Props, FormValues>({
  mapPropsToValues: props => {
    return {
      name: props.sheep ? props.sheep.name : "",
      sex: props.sheep ? props.sheep.sex : { label: "Female", value: "female" },
      branded: props.sheep ? props.sheep.branded : { label: "No", value: false }
    };
  },

  validationSchema: sheepSchema,

  handleSubmit: (values, { props }) => {
    console.log(values);
    props.submitSheep(values, props.index);
  }
  
})(InnerForm);

export default SheepForm;
