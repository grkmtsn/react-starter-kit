import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-grid-system';

import * as Yup from 'yup';
import { Panel } from '@/components/common';

import { Input, Textarea, DatePicker } from '@/components/form-elements';

const TextComponentPage = () => {
  return (
    <Row>
      <Col xs={12} md={4}>
        <Panel title="Form Control - Text Input">
          <Formik
            initialValues={{
              firstname: "Görkem",
              lastname: "Tosun",
              description: "KG Teknoloji",
              date: new Date()
            }}
            validationSchema={Yup.object({
              firstname: Yup.string()
                .required("Required"),
              lastname: Yup.string()
                .required("Required"),
              description: Yup.string()
                .required("Required")
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <Field
                component={Input}
                label="First Name (Input)"
                name="firstname"
                type="text"
                placeholder="First Name"
                requiredStar
              />
              <Field
                component={Input}
                label="Last Name"
                name="lastname"
                type="text"
                placeholder="Last Name"
                requiredStar
              />
              <Field
                component={Textarea}
                label="Description (Textarea)"
                name="description"
                rows="3"
                placeholder="Description"
                requiredStar
              />
              <Field
                component={DatePicker}
                label="DatePicker"
                name="date"
                placeholder="Select Date"
                requiredStar
              />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </Panel>
      </Col>
    </Row>
  )
}

export default TextComponentPage;