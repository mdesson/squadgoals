# #SquadGoals

Build habits together with #SquadGoals.

## Development Environment Configuration

After cloning the repo create the database "squadgoals" in postgres.

Ensure the postgresql user `postgres` with password `postgres` has access to the database.

In the root project directory run `make build`

Once this is complete, run `make run` to run the project.

Any time you add depdencies to either the frontend or backend, run `make build` again to install them and rebuild the containers.
