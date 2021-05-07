import firebase from '../../firebase/index'

const getUser = () =>
{
  let corectUser;
  firebase.firebase.auth().onAuthStateChanged(async (user : any) => {
      console.log(user.uid);
      const data : any = await firebase.fs.collection('users').doc(user.uid).get();
      localStorage.setItem('user', JSON.stringify(data.data()));
      corectUser = JSON.stringify(data.data())
  });
  return corectUser;
}

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
      user: getUser(),
    },
  getters:
    {
      GetUser (state : any) {
        return state.user
      }
    }
}