// -----------------------------In Redux package--------------------------------------------------
// Implementing store
function createStore(reducer) {
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action); // implemented in the 20th line
    listeners.forEach(l => l());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => listeners = listeners.filter(l => l !== listener);
  }
  dispatch({});
  return { getState, dispatch, subscribe };
}

// Implementing combineReducers(). this is Functional Programming.
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  }
}
// Implementing redux-thunk
const thunk = (store) => (next) => (action) =>
typeof action === 'function' ? action(next, store.getState) : next(action);
// Implementing applymiddleware
function applyMiddleware(store, middlewares = [thunk]) {
  middlewares.slice().forEach((middleware) => store.dispatch = middleware(store)(store.dispatch));
}

// --------------------------------------------------In react-redux package------------------------------------
// Implementing Provider & connect with React:
const Context = React.createContext();
function connect (mapStateToProps) {
  return (Component) => {
    class Receiver extends React.Component {
      componentDidMount() {
        const { subscribe } = this.props.store
        this.unsubcribe = subscribe(() => this.forceUpdate())
      }
      componentWillUnmount() {
        this.unsubcribe()
      }
      render() {
        const { dispatch, getState } = this.props.store
        const state = getState()
        const stateNeeded = mapStateToProps(state)
        return <Component {...stateNeeded} dispatch={dispatch} />
      }
    }
    class ConnectedComponent extends React.Component {
      render() {
        return (
          <Context.Consumer>
            {(store) => <Receiver store={store}/>}
          </Context.Consumer>
        )
      }
    }
    return ConnectedComponent
  }
}
class Provider extends React.Component {
  render() {
    return (
      <Context.Provider value={this.props.store}>
        {this.props.children}
      </Context.Provider>
    )
  }
}
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app')
);
