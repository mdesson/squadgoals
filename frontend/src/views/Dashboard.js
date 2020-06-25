import React, { Fragment, useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { browseSquadsRequest } from "../state/squad/squadActions";
import {
  squadListSelector,
  squadIsSubmittingSelector,
} from "../state/squad/squadSelectors";

// Material UI
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";

// Components
import SquadCard from "../components/SquadCard";

// Forms
import CreateSquadFormDialog from "../forms/CreateSquad/CreateSquadFormDialog";

// Util
import { isEmpty } from "lodash";

const useStyles = makeStyles((theme) => ({
  squadContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  createSquadButton: {
    marginTop: theme.spacing(4),
  },
  squadGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

// TODO: Create actual App Bar Component with some Navigation

function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const squadList = useSelector(squadListSelector);
  const isSubmitting = useSelector(squadIsSubmittingSelector);

  const [createSquadFormOpen, setCreateSquadFormOpen] = useState(false);

  useEffect(() => {
    if (isEmpty(squadList) || isSubmitting) {
      dispatch(browseSquadsRequest());
    }
  }, [isSubmitting]);

  return (
    <Fragment>
      <CreateSquadFormDialog
        open={createSquadFormOpen}
        close={() => setCreateSquadFormOpen(false)}
      />
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            SquadGoals
          </Typography>
        </Toolbar>
      </AppBar>
      <Fragment>
        <div className={classes.squadContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Your Squads
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              {isEmpty(squadList)
                ? `You currently don't have any squads...`
                : `Here's a list of all the squads you are apart of!`}
            </Typography>
            <div className={classes.createSquadButton}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    color="primary"
                    onClick={() => setCreateSquadFormOpen(true)}
                    variant="contained"
                  >
                    Create a Squad
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.squadGrid} maxWidth="md">
          <Grid container spacing={4}>
            {isEmpty(squadList)
              ? null
              : squadList.map((squad) => (
                  <SquadCard squad={squad} key={squad.id} />
                ))}
          </Grid>
        </Container>
      </Fragment>
    </Fragment>
  );
}

export default Dashboard;
