import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export type RootStateType = ReturnType<typeof rootReducer>;
export type DispatchType = ThunkDispatch<RootStateType, void, Action<any>>;