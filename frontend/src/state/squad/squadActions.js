// REQUEST

export const GET_SQUAD_REQUEST = "GET_SQUAD_REQUEST";
export const getSquadRequest = (squadId) => {
  return {
    type: GET_SQUAD_REQUEST,
    payload: { squadId },
  };
};

export const BROWSE_SQUADS_REQUEST = "BROWSE_SQUADS_REQUEST";
export const browseSquadsRequest = () => {
  return {
    type: BROWSE_SQUADS_REQUEST,
  };
};

export const POST_SQUAD_REQUEST = "POST_SQUAD_REQUEST";
export const postSquadRequest = () => {
  return {
    type: POST_SQUAD_REQUEST,
  };
};

export const PUT_SQUAD_REQUEST = "PUT_SQUAD_REQUEST";
export const putSquadRequest = (squadId, squadInformation) => {
  return {
    type: PUT_SQUAD_REQUEST,
    payload: { squadId, squadInformation },
  };
};

export const DELETE_SQUAD_REQUEST = "DELETE_SQUAD_REQUEST";
export const deleteSquadRequest = (squadId) => {
  return {
    type: DELETE_SQUAD_REQUEST,
    payload: { squadId },
  };
};

// SUCCESS

export const GET_SQUAD_SUCCESS = "GET_SQUAD_SUCCESS";
export const getSquadSuccess = (squad) => {
  return {
    type: GET_SQUAD_SUCCESS,
    payload: { squad },
  };
};

export const BROWSE_SQUADS_SUCCESS = "BROWSE_SQUADS_SUCCESS";
export const browseSquadsSuccess = (squadList) => {
  return {
    type: BROWSE_SQUADS_SUCCESS,
    payload: { squadList },
  };
};

export const POST_SQUAD_SUCCESS = "POST_SQUAD_SUCCESS";
export const postSquadSuccess = (squad) => {
  return {
    type: POST_SQUAD_SUCCESS,
    payload: { squad },
  };
};

export const PUT_SQUAD_SUCCESS = "PUT_SQUAD_SUCCESS";
export const putSquadSuccess = () => {
  return {
    type: PUT_SQUAD_SUCCESS,
  };
};

export const DELETE_SQUAD_SUCCESS = "DELETE_SQUAD_SUCCESS";
export const deleteSquadSuccess = () => {
  return {
    type: DELETE_SQUAD_SUCCESS,
  };
};

// ERROR

export const GET_SQUAD_ERROR = "GET_SQUAD_ERROR";
export const getSquadError = (error) => {
  return {
    type: GET_SQUAD_ERROR,
    payload: { error },
  };
};

export const BROWSE_SQUADS_ERROR = "BROWSE_SQUADS_ERROR";
export const browseSquadsError = (error) => {
  return {
    type: BROWSE_SQUADS_ERROR,
    payload: { error },
  };
};

export const POST_SQUAD_ERROR = "POST_SQUAD_ERROR";
export const postSquadError = (error) => {
  return {
    type: POST_SQUAD_ERROR,
    payload: { error },
  };
};

export const PUT_SQUAD_ERROR = "PUT_SQUAD_ERROR";
export const putSquadError = (error) => {
  return {
    type: PUT_SQUAD_ERROR,
    payload: { error },
  };
};

export const DELETE_SQUAD_ERROR = "DELETE_SQUAD_ERROR";
export const deleteSquadError = (error) => {
  return {
    type: DELETE_SQUAD_ERROR,
    payload: { error },
  };
};
