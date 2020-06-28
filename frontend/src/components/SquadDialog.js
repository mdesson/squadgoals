import React, { Fragment, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import { deleteSquadRequest, putSquadRequest } from "../state/squad/squadActions";

// Material UI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

// Mock Data
import { mockGoals, mockMembers } from "../common/mockData";

function SquadDialog({ open, close, squad }) {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [newSquadName, setNewSquadName] = useState(squad.name);
  const [newSqudDescription, setNewSqudDescription] = useState(squad.description);

  const deleteSquad = (squadId) => {
    dispatch(deleteSquadRequest(squadId));
    close();
  };

  const updateSquad = (squadId, squadInformation) => {
    dispatch(putSquadRequest(squadId, squadInformation));
    setEditMode(false);
  };

  const setDialogAction = () => {
    if (!deleteMode && !editMode) {
      return (
        <Button color="default" variant="outlined" onClick={() => close()} fullWidth>
          CLOSE
        </Button>
      );
    }

    return (
      <Button
        color={editMode ? "primary" : "default"}
        variant={editMode ? "contained" : "outlined"}
        onClick={
          editMode
            ? () => updateSquad(squad.id, { squadName: newSquadName, squadDescription: newSqudDescription })
            : () => setDeleteMode(false)
        }
        fullWidth
      >
        {editMode ? "SAVE CHANGES" : "CANCEL"}
      </Button>
    );
  };

  return (
    <Fragment>
      <Dialog open={open} onClose={close} maxWidth="lg" fullWidth>
        <DialogContent>
          <List>
            {deleteMode ? (
              <Grid container>
                <Grid item xs>
                  <Alert severity={"warning"}>
                    <Typography gutterBottom>
                      Are you sure you want to delete this squad? To confirm, click the trash icon a second time.
                      Otherwise, click the CANCEL button below.
                    </Typography>
                  </Alert>
                </Grid>
                <Grid></Grid>
              </Grid>
            ) : null}
            <ListItem>
              {editMode ? (
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="squadName"
                  label="Squad Name"
                  name="squadName"
                  defaultValue={squad.name}
                  onChange={(e) => setNewSquadName(e.target.value)}
                />
              ) : (
                <Fragment>
                  <Typography gutterBottom variant="h4">
                    {squad.name}
                  </Typography>
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        setEditMode(true);
                        setDeleteMode(false);
                      }}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={deleteMode ? () => deleteSquad(squad.id) : () => setDeleteMode(true)}>
                      <DeleteIcon color={deleteMode ? "secondary" : "primary"} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </Fragment>
              )}
            </ListItem>
            <Divider />
            {editMode ? (
              <ListItem>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="squadDescription"
                  label="Squad Description"
                  name="squadDescription"
                  multiline
                  rows={4}
                  defaultValue={squad.description}
                  onChange={(e) => setNewSqudDescription(e.target.value)}
                />
              </ListItem>
            ) : (
              <Fragment>
                <ListItem>
                  <Typography gutterBottom variant="h6">
                    Description
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography gutterBottom>{squad.description}</Typography>
                </ListItem>
              </Fragment>
            )}
            <ListItem>
              <Typography gutterBottom variant="h6">
                Goals
              </Typography>
              <ListItemSecondaryAction>
                <AddIcon color="primary" />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            {mockGoals()}
            <ListItem>
              <Typography gutterBottom variant="h6">
                Members
              </Typography>
              <ListItemSecondaryAction>
                <AddIcon color="primary" />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            {mockMembers(true)}
          </List>
        </DialogContent>
        <DialogActions>
          <Grid container alignItems="center" justify="center">
            <Grid xs={6} item>
              {setDialogAction()}
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default SquadDialog;
