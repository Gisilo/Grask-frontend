import React from 'react';
import { Formik, ErrorMessage, Form } from 'formik';
import { useMutation } from 'react-apollo';

import { CREATE_QUERY } from '../../costants/queries'


function MyVerticallyCenteredModal(props) {

	const [addGrabit] = useMutation(CREATE_QUERY);

	return (
		//sostituire con material ui
		<div 
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered>

			<div closeButton>
				<div id="contained-modal-title-vcenter">
					Create new Grabit
		  		</div>
			</div>
			<div>
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
						addGrabit({
							variables: {
								nameGrabit: data.grabitName,
								descr: data.description
							}
						}).then((success) => console.log('success', success), (error) => console.log('error', error));
						setSubmitting(false);
					}}>
					{({ values, isSubmitting }) => (
						<Form>
							<ErrorMessage name="grabitName" component="div" />
							{/* <InputTitleLeft id="ig1" title="Grabit Name" placeholder="Grabit Name" name="grabitName" />
							<TextAreaTitleLeft id="ig4" title="Description" placeholder="Description (Optional)" name="description" /> */}

							<button disabled={isSubmitting} type="submit" variant="primary">Create</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}


function CreateButton() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<button onClick={() => setModalShow(true)}>
				New Project
			</button>

			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)}/>
		</>
	);
}


export default CreateButton;


