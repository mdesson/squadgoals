import React, { Fragment } from "react";

// Redux
import { useDispatch } from "react-redux";
import { deleteSquadRequest } from "../state/squad/squadActions";

// Material UI
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  squadCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  squadContent: {
    flexGrow: 1,
  },
});

// TODO: Add functionality to VIEW and EDIT (probably a new component)
// TODO: Get list of Squad Goals from the API
// TODO: Get list  of Squad Members from the API

function SquadCard({ squad }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const mockGoals = () => {
    return (
      <Fragment>
        <ListItem>
          <ListItemIcon>
            <Checkbox color="primary" />
          </ListItemIcon>
          <ListItemText>Run a million miles every day.</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox color="primary" />
          </ListItemIcon>
          <ListItemText>Finish squad goals before the end of summer.</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Checkbox color="primary" />
          </ListItemIcon>
          <ListItemText>Play in the mud and eat as many rainbow as possible.</ListItemText>
        </ListItem>
      </Fragment>
    );
  };

  const mockMembers = () => {
    return (
      <Fragment>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="Sean Heinrichs" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="Michael Desson" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="Yaroslav Biblobaggins" />
        </ListItem>
      </Fragment>
    );
  };

  return (
    <Grid item xs={12} sm={12} md={6}>
      <Card className={classes.squadCard}>
        <CardContent className={classes.squadContent}>
          <Typography gutterBottom variant="h5">
            {squad.name}
          </Typography>
          <List>
            <ListItem>
              <ListItemText>{squad.description}</ListItemText>
            </ListItem>
            <ListSubheader>Goals</ListSubheader>
            {mockGoals()}
            <ListSubheader>Members</ListSubheader>
            {mockMembers()}
          </List>
        </CardContent>
        <CardActions>
          <Grid container alignItems="center" justify="flex-end" spacing={1}>
            <Grid xs={4} item>
              <Button variant="outlined" fullWidth>
                VIEW
              </Button>
            </Grid>
            <Grid xs={4} item>
              <Button variant="outlined" fullWidth>
                EDIT
              </Button>
            </Grid>
            <Grid xs={4} item>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => dispatch(deleteSquadRequest(squad.id))}
                fullWidth
              >
                DELETE
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default SquadCard;
