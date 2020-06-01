import { Reducer, Action, AnyAction, ReducersMapObject } from "redux";

export { Reducer } from "redux";

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): Promise<any> | T
}

export interface ReducerEnhancer {
  (reducer: Reducer<any>): void
}

export interface EffectsCommandMap {
  put: <A extends AnyAction>(action: A) => any
  call: Function
  select: Function
  take: Function
  cancel: Function
  [key: string]: any
}

export type Effect = (action: AnyAction, effects: EffectsCommandMap) => void;
export type EffectType = "takeEvery" | "takeLatest" | "watcher" | "throttle";
export type EffectWithType = [Effect, { type: EffectType }];
export type Subscription = (api: SubscriptionAPI, done: Function) => void;
export type ReducersMapObjectWithEnhancer = [
  ReducersMapObject,
  ReducerEnhancer
];

export interface EffectsMapObject {
  [key: string]: Effect | EffectWithType
}

export interface SubscriptionAPI {
  history: History
  dispatch: Dispatch<any>
}

export interface SubscriptionsMapObject {
  [key: string]: Subscription
}

export interface Model {
  namespace: string
  state?: any
  reducers?: ReducersMapObject | ReducersMapObjectWithEnhancer
  effects?: EffectsMapObject
  subscriptions?: SubscriptionsMapObject
}
