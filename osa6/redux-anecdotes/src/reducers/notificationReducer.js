export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, time * 1000)
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default: return state
  }
}

export default notificationReducer