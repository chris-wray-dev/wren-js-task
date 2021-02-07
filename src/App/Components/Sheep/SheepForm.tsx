import React from 'react';

import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';

import Select from 'react-select';

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

      <button className="btn btn-primary" type="submit">Add Sheep</button>{' '}
      <button className="btn btn-secondary">Cancel</button>
    </Form>
  );
};

interface Options {
  label: string;
  value: string | boolean;
}

interface FormikSelectProps {
  onChange: Function;
  onBlur: Function;
  options: Array<Options>
  name: string
}

class FormikSelect extends React.Component<FormikSelectProps, any> {
  handleChange = (value: Sex | Branded | null ) => {
    this.props.onChange(value);
  };
  
  handleBlur = () => {
    this.props.onBlur(true);
  };
  
  render() {
    return (
      <Select
        name={this.props.name}
        options={this.props.options}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
    );
  }
}

interface Props {
  name: string;
  sex: { label: string, value: string };
  branded: { label: string, value: boolean };
}

const SheepForm = withFormik<Props, FormValues>({
  mapPropsToValues: props => {
    return {
      name: props.name || '',
      sex: props.sex,
      branded: props.branded,
    };
  },

  validationSchema: sheepSchema,

  handleSubmit: values => {
    console.log(values);
  },
})(InnerForm);

export default SheepForm;
