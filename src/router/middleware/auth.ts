import firebase from './../../firebase/index'

export default async function auth ({ next } : any) {
    await firebase.firebase.auth().onAuthStateChanged((user : any) => {
        if(user)
            return next();
        else
        return next({
            name: 'Login'
        })
    });
    // console.log(status);
    // if(Object.prototype.hasOwnProperty.call(localStorage, 'user'))
    // {
    //     return next()
    // }
    // else
    // {
    //     return next({
    //         name: 'Login'
    //     })
    // }
}
