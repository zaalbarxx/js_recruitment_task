import { Action, ACTION_TYPE } from './actions';
import { PubSub } from './../utils/PubSub';
import { DeepPartial } from './../shared/interfaces';
import { deepMerge } from '../utils/deep-merge';
import { AsyncAction, HandlersMap } from './interfaces';


export class Store<State = any> {
  private state: State;
  private events = new PubSub();

  constructor(
    private initialState: State,
    private actionHandlers: HandlersMap<State>
  ) {
    this.state = initialState;
  }

  on<Data = unknown>(eventName: string, callback: (data: Data) => void) {
    this.events.on<Data>(eventName, callback);
  }

  off(eventName: string, callback: (...args: unknown[]) => void) {
    this.events.off(eventName, callback);
  }

  getState(): State {
    return this.state;
  }

  dispatch(action: Action | AsyncAction<State>): void {
    if (isAsyncAction(action)) {
      action(this.getState.bind(this), this.dispatch.bind(this));
      return;
    }

    const _action: Action = action as Action;
    const handler = this.actionHandlers[_action.type] ?? ((_: any) => this.state);

    this.update(handler(_action.payload, this.state));
  }

  private update(state: DeepPartial<State>): void {
    this.state = deepMerge(this.state, state as any, {
      arrayMerge: (destinationArray, sourceArray) => sourceArray,
    });
    this.fireEvent(ACTION_TYPE.STATE_UPDATED, this.state);
  }

  private fireEvent(eventName: string, data?: any): void {
    this.events.fire(eventName, data);
  }
}

const isAsyncAction = (action: Action | AsyncAction<any>): action is AsyncAction<any> => {
  return typeof action === 'function';
}

