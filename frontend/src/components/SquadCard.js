import React, { Fragment, useState } from "react";

// Material UI
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Typography,
} from "@material-ui/core";

// Components
import SquadDialog from "./SquadDialog";

// Mock Data
import { mockGoals, mockMembers } from "../common/mockData";

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

// TODO: Get list of Squad Goals from the API
// TODO: Get list  of Squad Members from the API

function SquadCard({ squad }) {
  const classes = useStyles();

  const [openSquadDialog, setOpenSquadDialog] = useState(false);

  return (
    <Fragment>
      <SquadDialog open={openSquadDialog} close={() => setOpenSquadDialog(false)} squad={squad} />
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
              {mockMembers(false)}
            </List>
          </CardContent>
          <CardActions>
            <Grid container alignItems="center" justify="center">
              <Grid xs={6} item>
                <Button variant="outlined" onClick={() => setOpenSquadDialog(true)} fullWidth>
                  VIEW
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Fragment>
  );
}

export default SquadCard;
