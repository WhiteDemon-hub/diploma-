export default
{
  namespaced: true,
  actions:
    {
      LoadUser ({ commit } : any ) 
      {
        commit('MutationUser', localStorage.user)
      },
      ClearUser({commit} : any)
      {
        commit('MutationUser', null)
      }
    },
  mutations:
    {
      MutationUser (state : any, data : JSON) {
        state.user = data;
      }
    },
  state:
    {
      user: localStorage.user,
    },
  getters:
    {
      GetUser (state : any) {
        return state.user
      }
    }
}