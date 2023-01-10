
export const API_URL = process.env.REACT_APP_BACKEND_API_URL;

export const configHeaders = (token: string | null) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
}
