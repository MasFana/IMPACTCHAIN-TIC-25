declare module "react-router" {
  interface AppLoadContext {}
}

export interface Route {
  LoaderArgs: {
    request: Request
    params: {}
    context: {}
  }
  ActionArgs: {
    request: Request
    params: {}
    context: {}
  }
}
