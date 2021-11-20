export const clearNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
  }
}

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: content
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