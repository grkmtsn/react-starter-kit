import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-grid-system';

import { Panel } from '@/components/common';

import { Checkbox, Radio } from '@/components/form-elements';

const CheckboxRadioComponentPage = () => {
  const handleChangeCheckbox = (e) => {
    console.log(e.target.checked);
  }

  const handleChangeRadio = (e) => {
    console.log(e.target.value);
  }
  return (
    <Row>
      <Col xs={12} md={4}>
        <Panel title="Form Control - Checkbox - Radio">
          <Formik
            initialValues={{
              acceptedTerms: false,
              disabledTerms: true,
              radio: "Select 1"
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <Field component={Checkbox} name="acceptedTerms" onChange={handleChangeCheckbox}>
                I Accept
            </Field>
              <Field component={Checkbox} name="disabledTerms" disabled>
                I Decline
            </Field>
              <Field component={Radio} id="radio-1" name="radio" value="Select 1" onChange={handleChangeRadio}>
                Select 1
            </Field>
              <Field component={Radio} id="radio-2" name="radio" value="Select 2" onChange={handleChangeRadio}>
                Select 2
            </Field>
              <Field component={Radio} id="radio-3" name="radio" value="Select 3" disabled>
                Select 3
            </Field>
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </Panel>
      </Col>
    </Row>
  )
}

export default CheckboxRadioComponentPage;