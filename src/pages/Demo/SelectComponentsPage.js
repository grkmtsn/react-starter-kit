import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-grid-system';

import * as Yup from 'yup';
import { Panel } from '@/components/common';

import { Dropdown, AsyncDropdown } from '@/components/form-elements';

const SelectComponentPage = () => {
  const handleChangeDropdown = (e) => {
    console.log(e);
  }
  return (
    <Row>
      <Col xs={12} md={4}>
        <Panel title="Form Control - Select">
          <Formik
            initialValues={{
              city: 700280,
              region: [9133843, 57271182],
              userSingle: "",
              users: []
            }}
            validationSchema={Yup.object({
              city: Yup.string()
                .required("Required"),
              region: Yup.array()
                .nullable()
                .required("Required"),
              userSingle: Yup.string()
                .required("Required"),
              users: Yup.array()
                .nullable()
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
                component={Dropdown}
                label="Static Select Single City"
                name="city"
                placeholder="Please Select City"
                requiredStar
                onChange={handleChangeDropdown}
              />
              <Field
                component={Dropdown}
                label="Static Select Multi Region"
                name="region"
                placeholder="Please Select Region"
                requiredStar
                isMulti
                onChange={handleChangeDropdown}
              />
              <Field
                component={AsyncDropdown}
                label="Async Search Single User"
                name="userSingle"
                placeholder="Please Search User"
                requiredStar
              />
              <Field
                component={AsyncDropdown}
                label="Async Search Multi User"
                name="users"
                placeholder="Please Search User"
                requiredStar
                isMulti
              />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </Panel>
      </Col>
    </Row>
  )
}

export default SelectComponentPage;