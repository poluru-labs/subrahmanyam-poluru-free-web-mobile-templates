const name = import.meta.env.VITE_APP_NAME?.trim()

export const appConfig = {
  name: name && name.length > 0 ? name : 'Dependency Risk Dashboard',
}
