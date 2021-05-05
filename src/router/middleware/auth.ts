export default function auth ({ next } : any) {
    if(Object.prototype.hasOwnProperty.call(localStorage, 'user'))
    {
        return next()
    }
    else
    {
        return next({
            name: 'Login'
        })
    }
}
