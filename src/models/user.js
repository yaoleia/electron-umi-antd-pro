import { queryCurrent, query as queryUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    isLoading: false,
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *fetchProvince({ payload }, { put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      yield put({
        type: 'setProvince',
        payload,
      });
    },

    *fetchCity({ payload }, { put }) {
      yield put({
        type: 'setCity',
        payload,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    setProvince(state, action) {
      const { geographic } = state.currentUser;
      if (geographic) {
        Object.assign(geographic, { province: action.payload.province });
      }
      return { ...state };
    },

    setCity(state, action) {
      const { geographic } = state.currentUser;
      if (geographic) {
        Object.assign(geographic, { city: action.payload.city });
      }
      return { ...state };
    },

    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default UserModel;
