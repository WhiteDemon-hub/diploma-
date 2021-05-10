import firebase from '../../firebase/index';

export default async function object ({ to, from, next, store } : any) {
    await firebase.firebase.auth().onAuthStateChanged(async (user : any) => {
        if(to.params.id == 1)
        return next();
        const uid : any = user.uid;
        let result : any;
        const status = await firebase
        .fs
        .collection('js_object_and_class_user')
        .where('uid', '==', uid)
        .get();

        status.forEach((el : any) => {
            result = el.data().status;
        });

        if(result[to.params.id - 2] || to.params.id == 1)
        return next();
        console.log(from);
        return next({
            path: from.fullPath
        });
    });
}