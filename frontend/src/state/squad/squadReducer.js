import {
  GET_SQUAD_REQUEST,
  GET_SQUAD_SUCCESS,
  GET_SQUAD_ERROR,
  BROWSE_SQUADS_REQUEST,
  BROWSE_SQUADS_SUCCESS,
  BROWSE_SQUADS_ERROR,
  POST_SQUAD_REQUEST,
  POST_SQUAD_SUCCESS,
  POST_SQUAD_ERROR,
  PUT_SQUAD_REQUEST,
  PUT_SQUAD_SUCCESS,
  PUT_SQUAD_ERROR,
  DELETE_SQUAD_REQUEST,
  DELETE_SQUAD_SUCCESS,
  DELETE_SQUAD_ERROR,
} from "./squadActions";

const initialState = {
  squad: {},
  squadList: [],
  isLoading: false,
  isSubmitting: false,
};

const squadReducer = (state = initialState, action) => {
  switch (action.type) {
    /* REQUEST */
    case GET_SQUAD_REQUEST:
    case BROWSE_SQUADS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case POST_SQUAD_REQUEST:
    case PUT_SQUAD_REQUEST:
    case DELETE_SQUAD_REQUEST: {
      return {
        ...state,
        isSubmitting: true,
      };
    }

    /* SUCCESS */
    case GET_SQUAD_SUCCESS: {
      return {
        ...state,
        squad: action.payload.squad,
        isLoading: false,
      };
    }
    case BROWSE_SQUADS_SUCCESS: {
      return {
        ...state,
        squadList: action.payload.squadList,
        isLoading: false,
      };
    }
    case POST_SQUAD_SUCCESS: {
      return {
        ...state,
        squad: action.payload.squad,
        isSubmitting: false,
      };
    }
    case PUT_SQUAD_SUCCESS:
    case DELETE_SQUAD_SUCCESS: {
      return {
        ...state,
        isSubmitting: false,
      };
    }

    /* ERROR */
    case GET_SQUAD_ERROR:
    case BROWSE_SQUADS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case POST_SQUAD_ERROR:
    case PUT_SQUAD_ERROR:
    case DELETE_SQUAD_ERROR: {
      return {
        ...state,
        isSubmitting: false,
      };
    }
  }
};

export default squadReducer;
