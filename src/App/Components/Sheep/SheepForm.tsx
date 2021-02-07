import React from 'react';
import * as Yup from 'yup';
import { withFormik, FormikProps, Form, Field } from 'formik';

interface FormValues {
  name: string;
  sex: string;
  branded: string
}

export const sheepSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Please enter at lease two characters.")
    .max(10, "No more than 10 characters are allowed.")
    .required("Please enter a name for this animal."),
  sex: Yup.string()
    .oneOf(['male', 'female'])
    .required("Please enter the sex of the animal."),
  branded: Yup.string()
    .oneOf(["yes", "no"])
    .required("Please state if this sheep is to be branded.")
});

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form>
      <div className="form-group">
        <label>Name</label>
        <Field name="name" />
        {errors.name && touched.name ? (
          <div className="invalid-feedback d-block">
            {errors.name}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label>Sex</label>
        <Field name="sex" />
        {errors.sex && touched.sex ? (
          <div className="invalid-feedback d-block">
            {errors.sex}
          </div>
        ) : null}
      </div>
      <div className="form-group">
        <label>Branded</label>
        <Field name="branded" />
        {errors.branded && touched.branded ? (
          <div className="invalid-feedback d-block">
            {errors.branded}
          </div>
        ) : null}
      </div>

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

interface Props {
  name: string;
  sex: string;
  branded: string;
}

const SheepForm = withFormik<Props, FormValues>({
  mapPropsToValues: props => {
    return {
      name: props.name || '',
      sex: props.sex || '',
      branded: props.branded || '',
    };
  },

  validationSchema: sheepSchema,

  handleSubmit: values => {
    console.log(values);
  },
})(InnerForm);

export default SheepForm;
