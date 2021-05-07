import firebase from '../../firebase/index'


export default
{
  namespaced: true,
  actions:
    {
      LoadUser ({ commit } : any ) 
      {

          firebase.firebase.auth().onAuthStateChanged(async (user : any) => {
            if(user)
            {
              const data : any = await firebase.fs.collection('users').doc(user.uid).get();
            
              commit('MutationUser', JSON.stringify(data.data()));
            }
            
        });
        
      },
      ClearUser({commit} : any)
      {
        commit('MutationUser', null)
      },

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