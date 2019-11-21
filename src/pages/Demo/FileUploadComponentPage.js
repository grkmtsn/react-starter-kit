import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Row, Col } from 'react-grid-system';

import * as Yup from 'yup';
import { Panel } from '@/components/common';

import { Upload } from '@/components/form-elements';

const FileUploadComponentPage = () => {
  return (
    <Row>
      <Col xs={12} md={4}>
        <Panel title="File Upload">
          <Formik
            initialValues={{
              file: undefined
            }}
            validationSchema={Yup.object({
              file: Yup.mixed().required("Required"),
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
                component={Upload}
                label="Media With Form Submit"
                name="file"
                id="file"
                acceptedFileTypes={['image/png']}
                maxFileSize={1024}
                maxFiles={5}
                upload={false}
                allowMultiple
                requiredStar
              />
              <Upload
                label="Media Only Upload"
                name="file"
                id="file"
                acceptedFileTypes={['image/png']}
                maxFileSize={1024}
                serverConfig={{
                  url: 'http://178.128.247.85:8099/api/media/upload',
                  process: {
                    url: '/',
                    method: 'POST',
                    headers: {
                      "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMiIsImlhdCI6MTU3MzQ4MTA5NiwiZXhwIjoxNTc0MDg1ODk2fQ.o_wRepfROpZrP28ugebxszxmudS74JcZDnZ4WMLeKs2UJVqxp0nJBhgg5GCI0mfOsBvrRhW5dXuNZaREwgxndg",
                    },
                    onload: (response) => {
                      console.log(JSON.parse(response));
                    },
                    ondata: (formdata) => {
                      formdata.append('mediaType', 'VOICE');
                      return formdata;
                    }
                  }
                }}
              />
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </Panel>
      </Col>
    </Row>
  )
}

export default FileUploadComponentPage;