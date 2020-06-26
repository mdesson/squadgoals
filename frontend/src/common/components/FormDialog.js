import React from "react";
import { Form } from "react-final-form";

// Material UI
import { Button, Dialog, DialogContent, DialogTitle, Grid, makeStyles } from "@material-ui/core";

// Util
import ValidationService from "../services/validation.service";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    marginTop: theme.spacing(4),
  },
}));

function FormDialog({
  children,
  close,
  maxWidth,
  open,
  onCancel,
  onSubmit,
  primaryButtonLabel,
  secondaryButtonLabel,
  title,
  validationSchema,
}) {
  const classes = useStyles();

  const generateErrors = (values) => ValidationService(values, validationSchema).errors;

  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={close}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          validate={generateErrors}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate>
              {children}
              <Grid container alignItems="center" justify="flex-end" spacing={1}>
                <Grid item xs={12} sm={4}>
                  <Button
                    onClick={onCancel}
                    color="secondary"
                    variant="contained"
                    fullWidth
                    className={classes.dialogActions}
                  >
                    {secondaryButtonLabel}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button type="submit" color="primary" variant="contained" fullWidth className={classes.dialogActions}>
                    {primaryButtonLabel}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
}

export default FormDialog;
