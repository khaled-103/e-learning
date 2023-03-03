export default async function ({ store, route, from, redirect }) {
  let tokenInfo = store.state.auth.token;
  console.log(route.params.slug);
  let result = await store.dispatch("auth/sendRequest", {
    url: "/checkUserPayStatus",
    dataSend: {
      course_slug: route.params.slug,
      user_id: tokenInfo.tokenable_id,
    },
  });
  if (result.data.status) {
    if (result.data.userStatus != "register") {
      return redirect({ name: "index" });
    }
  }
}
