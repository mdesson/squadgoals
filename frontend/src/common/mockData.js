// This file should be deleted once API calls can be made.
import React, { Fragment } from "react";

// Material UI
import {
  Avatar,
  Checkbox,
  Grid,
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

export const mockGoals = () => {
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

export const mockMembers = (hasMenu) => {
  return (
    <Fragment>
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Grid xs={6} item>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary="Sean Heinrichs (Owner)" />
          </ListItem>
        </Grid>
        <Grid xs={6} item>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary="Michael Desson" />
            <ListItemSecondaryAction>{hasMenu ? <MoreHorizIcon /> : null}</ListItemSecondaryAction>
          </ListItem>
        </Grid>
        <Grid xs={6} item>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary="Yaroslav Biblobaggins" />
            <ListItemSecondaryAction>{hasMenu ? <MoreHorizIcon /> : null}</ListItemSecondaryAction>
          </ListItem>
        </Grid>
        <Grid xs={6} item>
          <ListItem>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary="Mr. Bean" />
            <ListItemSecondaryAction>{hasMenu ? <MoreHorizIcon /> : null}</ListItemSecondaryAction>
          </ListItem>
        </Grid>
      </Grid>
    </Fragment>
  );
};
