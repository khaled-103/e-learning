export default async function ({store , route ,from ,redirect }) {
  let tokenInfo = store.state.auth.token;
  console.log(route.params.slug);
  // let result = await this.sendRequest({
  //   url: "/checkUserPayStatus",
  //   dataSend: {
  //     course_id:route.params.slug,
  //     user_id:tokenInfo.tokenable_id
  //   },
  // });
  // if(result.data.status){
  //   if(result.data.userStatus != 'register'){
  //     return redirect({name:'index'});
  //   }
  // }

  
  // if(tokenInfo == null){
  //   await store.dispatch('auth/initToken');
  //   tokenInfo = store.state.auth.token;
  // }
  // if(tokenInfo == null){
  //     return redirect({name:'orgnaization-login'});
  // }
  // if(tokenInfo.tokenable_type != 'orgnaization'){
  //     if(from != null){
  //         return redirect({name:from.name});
  //     }
  //     return redirect({name:'index'});
  // }
}