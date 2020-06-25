import React from "react";

// Redux
import { useDispatch } from "react-redux";
import { postSquadRequest } from "../../state/squad/squadActions";

// Form
import { TextField } from "mui-rff";
import FormDialog from "../../common/components/FormDialog";
import createSquadSchema from "../CreateSquad/CreateSquadFormDialog.schema";

// Util
import queryString from "query-string";

function CreateSquadFormDialog({ open, close }) {
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    dispatch(postSquadRequest(queryString.stringify(formValues)));
    close();
  };

  return (
    <FormDialog
      open={open}
      close={close}
      maxWidth="md"
      title="Create a Squad"
      primaryButtonLabel="Create Squad"
      secondaryButtonLabel="Cancel"
      validationSchema={createSquadSchema}
      onSubmit={onSubmit}
      onCancel={close}
    >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="squadName"
        label="Squad Name"
        name="squadName"
        autoComplete="Squad Name"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="squadDescription"
        label="Squad Description"
        name="squadDescription"
        autoComplete="Squad Description"
        multiline
        rows={4}
      />
    </FormDialog>
  );
}

export default CreateSquadFormDialog;
