import firebase from './../../firebase/index'
export default async function guest ({ next } : any) {
    await firebase.firebase.auth().onAuthStateChanged((user : any) => {
        if(user)
            return next({
                name: 'Home'
            })
        else
        return next()
    });
}
