export function loadState(KEY: string) {
  try {
    const serializedState = localStorage.getItem(KEY)
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

export async function saveState(state: any, KEY: string) {
  try {
    const serializedState = JSON.stringify(state.auth.user.token)
    localStorage.setItem(KEY, serializedState)
  } catch (e) {
    //
  }
}
