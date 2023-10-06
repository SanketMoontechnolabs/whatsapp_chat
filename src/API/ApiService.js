import {toast} from 'react-hot-toast'

import {URLS} from './UrlList'
import {store} from '../redux/store'
import {AuthAction} from '../redux/actions/AuthAction'

let loginErrorDisplayed = false
const ApiService = async (url, type, data, formData = false, tokenValue = '') => {
  const {token, userData} = store.getState().AuthReducer

  const headers = {
    'x-api-key': URLS.X_API_KEY,
    ...(formData ? {} : {'Content-Type': 'application/json'}),
    ...(tokenValue || token ? {Authorization: `Bearer ${tokenValue || token}`} : {}),
    // lan: 'ar',
  }

  const requestOptions = {
    method: type,
    headers,
    body: formData ? data : JSON.stringify(data),
    redirect: 'follow',
  }

  const response = await fetch(`${URLS.BASE_URL}/${url}`, requestOptions)
console.log("response",response);
  if (response.status === 401) {
    const result = await (
      await fetch(`${URLS.BASE_URL}/auth/refresh_token`, {
        method: 'GET',
        headers,
        redirect: 'follow',
      })
    ).json()

    if (result.ack) {
      store.dispatch(
        AuthAction({
          token: result.data,
          userData,
        })
      )
      return ApiService(url, type, data, formData, result.data)
    } else {
      if (!loginErrorDisplayed) {
        toast.error('You need to login first.')
        loginErrorDisplayed = true
      }
      localStorage.clear()
      window.location.replace(`${window.location.origin}/#/login`)
    }

    return
  } else if (response.status === 409) {
    if (!loginErrorDisplayed) {
      toast.error('You need to login first.')
      loginErrorDisplayed = true
    }
    localStorage.clear()
    window.location.replace(`${window.location.origin}/#/login`)
  } else if (!response.ok) {
    toast.error(response.statusText)
  
  }

  return response.json()
}

export default ApiService
          