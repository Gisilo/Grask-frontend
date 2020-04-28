import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Formik, ErrorMessage, Form } from 'formik';
import { InputTitleLeft, TextAreaTitleLeft, } from '../inputs';

import gql from 'graphql-tag'
import { useMutation } from 'react-apollo';

const GRABIT_MUTATION = gql`
	mutation CreateGrabit($nameGrabit: String!, $descr: String){
		createGrabit(input: {
			nameProject: $nameGrabit
			description: $descr
		})
		{
			grabit {
				id
				nameProject
				description
			}
		}
	}`;

function MyVerticallyCenteredModal(props) {

	const [addGrabit] = useMutation(GRABIT_MUTATION);

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Create new Grabit
		  </Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={{ grabitName: "", description: "" }}
					validate={values => {
						const errors = {};
						if (!values.grabitName) {
							errors.grabitName = 'Required';
						}
						return errors;
					}}
					onSubmit={(data, { setSubmitting }) => {
						setSubmitting(true);
						console.log("submit: ", data);
						// GRAPHQL REQUEST
						let ao = addGrabit({
							variables: {
								nameGrabit: data.grabitName,
								descr: data.description
							}
						});
						ao.then((res) => console.log('sucess', res), (err) => console.log('error', err));
						setSubmitting(false);
					}}>
					{({ values, isSubmitting }) => (
						<Form>
							<ErrorMessage name="grabitName" component="div" />
							<InputTitleLeft id="ig1" title="Grabit Name" placeholder="Grabit Name" name="grabitName" />
							<TextAreaTitleLeft id="ig4" title="Description" placeholder="Description (Optional)" name="description" />

							<Button disabled={isSubmitting} type="submit" variant="primary">Create</Button>
						</Form>
					)}
				</Formik>
			</Modal.Body>
		</Modal>
	);
}


function GrabitCreatorBtn() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<Button variant="primary" onClick={() => setModalShow(true)}>
				New Project
      </Button>

			<MyVerticallyCenteredModal
				show={modalShow}
				onHide={() => setModalShow(false)}
			/>
		</>
	);
}


export default GrabitCreatorBtn;

