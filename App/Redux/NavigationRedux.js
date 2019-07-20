import {Routes} from '../Navigation/NavigationRouter'

export const reducer = (state, action) => {
  const nextState = Routes.router.getStateForAction(action, state)
  return nextState || state
}
