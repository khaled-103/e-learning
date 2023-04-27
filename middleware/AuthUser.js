export default async function ({ store, route, from, redirect }) {
  let tokenInfo = store.state.auth.token;
  if (tokenInfo == null) {
    await store.dispatch("auth/initToken");
    tokenInfo = store.state.auth.token;
  }
  console.log('tokeninfo ' + tokenInfo);
  if (tokenInfo == null) {
    return redirect({
      path: '/user/login',
      query: {
        redirect: route.fullPath // Add the current path as a redirect query parameter
      }
    });
  }
  if (tokenInfo.tokenable_type != "user") {
    if (from != null) {
      return redirect({ name: from.name });
    }
    return redirect({ name: "orgnaization-dashboard" });
  }
}
