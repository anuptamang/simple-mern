export const API_URL = process.env.REACT_APP_BACKEND_API_URL

const userInfo = JSON.parse(localStorage.getItem('user') || '{}')
const token = userInfo?.auth?.user?.token

export const configHeaders = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}
