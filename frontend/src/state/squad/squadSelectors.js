import { createSelector } from "reselect";

const squadStateSelector = (state) => state.squadReducer;

export const squadDetailsSelector = createSelector(
  [squadStateSelector],
  (squadState) => squadState.squad
);

export const squadListSelector = createSelector(
  [squadStateSelector],
  (squadState) => squadState.squadList
);

export const squadIsLoadingSelector = createSelector(
  [squadStateSelector],
  (squadState) => squadState.isLoading
);

export const squadIsSubmittingSelector = createSelector(
  [squadStateSelector],
  (squadState) => squadState.isSubmitting
);
