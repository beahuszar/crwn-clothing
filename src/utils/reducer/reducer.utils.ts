import {AnyAction} from "redux";

/**
 * AC: action creator
 * Matchable receives an action creator which is an object that returns AnyAction
 * hybrid result (intersection of types): action creator type mixed with
 *      type: the return type of the action creator (action itself) getting its type property's type
 *      match: type predicate function
 */
type Matchable<AC extends () => AnyAction> = AC & {
    type: ReturnType<AC>["type"];
    match(action: AnyAction): action is ReturnType<AC>;
}

export function withMatcher<AC extends () => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;
export function withMatcher<AC extends (...args: any[]) => AnyAction & {type: string}>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        }
    })
}

export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
}

export type Action<T> = {
    type: T;
}

// function overloading
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
    return {type, payload};
}
