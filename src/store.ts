/**
 * Redux Store Configuration
 *
 * Simple Redux store managing global application state.
 * Handles sidebar visibility and collapse state.
 *
 * @module store
 */

import { legacy_createStore as createStore } from 'redux'

/**
 * Interface representing the Redux root state
 */
export interface RootState {
  sidebarShow: boolean
  sidebarUnfoldable?: boolean
  [key: string]: any
}

/**
 * Initial state for the Redux store
 */
const initialState: RootState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

/**
 * Generic action interface for state updates
 */
export interface StateAction {
  type: string
  [key: string]: any
}

/**
 * Root reducer function that handles all state changes
 */
const changeState = (state: RootState = initialState, action: StateAction): RootState => {
  const { type, ...rest } = action
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

/**
 * Redux store instance
 */
const store = createStore(changeState)

export type AppDispatch = typeof store.dispatch

export default store
