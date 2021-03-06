import firebase from '../../firebase/index';

export default async function openTask ({ to, from, next, store } : any) {
    await firebase.firebase.auth().onAuthStateChanged(async (user : any) => {
        const uid : any = user.uid;
        let result : any;
        const status = await firebase
        .fs
        .collection('user_passing_task_js')
        .where('uid', '==', uid)
        .get();

        status.forEach((el : any) => {
            result = el.data().status;
        });

        if(result[to.params.id - 1])
        return next();
        console.log(from);
        return next({
            path: from.fullPath
        });
    });
}