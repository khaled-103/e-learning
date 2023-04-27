export default async function ({ store, route, from, redirect }) {
  let tokenInfo = store.state.auth.token;
  if (tokenInfo == null) {
    await store.dispatch("auth/initToken");
    tokenInfo = store.state.auth.token;
  }
  if (tokenInfo != null) {
    if (from != null) {
      return redirect({ name: from.name });
    }
    return redirect({
      name:
        tokenInfo.tokenable_type == "user" ? "index" : "orgnaization-dashboard",
    });
  }
}