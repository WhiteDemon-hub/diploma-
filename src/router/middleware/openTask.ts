import firebase from '../../firebase/index';

export default async function openTask ({ to, from, next } : any) {
    const uid : any = JSON.parse(localStorage.user).uid;
    // let result : any;
    // const status = await firebase
    // .fs
    // .collection('user_passing_task_js')
    // .where('uid', '==', uid)
    // .get();

    // status.forEach((el : any) => {
    //     result = el.data().status;
    // });

    // if(result[to.params.id - 1])
    return next();
    return next({
        path: from.fullPath
    });
}