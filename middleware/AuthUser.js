export default async function ({ store, route, from, redirect }) {
  let tokenInfo = store.state.auth.token;
  if (tokenInfo == null) {
    await store.dispatch("auth/initToken");
    tokenInfo = store.state.auth.token;
  }
  if (tokenInfo == null) {
    return redirect({ name: "user-login" });
  }
  if (tokenInfo.tokenable_type != "user") {
    if (from != null) {
      return redirect({ name: from.name });
    }
    return redirect({ name: "orgnaization-dashboard" });
  }
}
