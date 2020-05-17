import React from 'react';
import { TextField } from 'mui-rff';

// Common Component
import FormDialog from '../common/components/FormDialog';

// TODO: Link Up JOI Validaton
// TODO: Add User Avatar

function CreateAccountFormDialog({ open, close }) {
	const onSubmit = (formValues) => {
		console.log(formValues);
	};

	return (
		<FormDialog
			open={open}
			close={close}
			maxWidth="md"
			title="Create an Account"
			primaryButtonLabel="Create Account"
			secondaryButtonLabel="Cancel"
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
