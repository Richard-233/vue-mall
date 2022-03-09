/**
 * 商城Vuex-mutations
 */
export default {
    saveUserInfo(state,user){
        state.nickname=user.nickname;
        state.user_image=user.image;
        state.user_id=user.id;
    }
}
