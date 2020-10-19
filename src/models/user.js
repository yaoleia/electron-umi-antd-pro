import { queryCurrent, putUser } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
    isLoading: false,
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const resp = yield call(putUser, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: resp,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeLoading(state, action) {
      return { ...state, isLoading: action.payload };
    },
  },
};
export default UserModel;
