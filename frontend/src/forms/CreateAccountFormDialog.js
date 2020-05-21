import React from 'react';

// Redux
import { useDispatch } from 'react-redux';
import { postUserRequest } from '../state/user/userActions';

// Form
import { TextField } from 'mui-rff';
import FormDialog from '../common/components/FormDialog';
import createAccountSchema from './CreateAccountFormDialog.schema';

// Util
import queryString from 'query-string'

// TODO: Add User Avatar

function CreateAccountFormDialog({ open, close }) {
	const dispatch = useDispatch();

	const onSubmit = (formValues) => {
		dispatch(postUserRequest(queryString.stringify(formValues)));
		close();
	};

	return (
		<FormDialog
			open={open}
			close={close}
			maxWidth="md"
			title="Create an Account"
			primaryButtonLabel="Create Account"
			secondaryButtonLabel="Cancel"
			validationSchema={createAccountSchema}
			onSubmit={onSubmit}
			onCancel={close}
		>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="firstName"
				label="First Name"
				name="firstName"
				autoComplete="First Name"
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="lastName"
				label="Last Name"
				name="lastName"
				autoComplete="Last Name"
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="email"
				label="Email"
				name="email"
				autoComplete="Email"
			/>
			<TextField
				variant="outlined"
				margin="normal"
				required
				fullWidth
				id="aspirationalMessage"
				label="Aspirational Message"
				name="aspirationalMessage"
				autoComplete="Aspirational Message"
			/>
		</FormDialog>
	);
}

export default CreateAccountFormDialog;
