import { NavigationGuardNext, RouteLocationNormalized } from "vue-router"
export interface MiddlewareContext {
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
}

export default function checkMiddlewares(
    context: MiddlewareContext,
    middlewares: Array<any>
) {
    for (let i = 0; i < middlewares.length; i++) {
        const middleware = middlewares[i];
        const res = middleware(context)
        if(res !== true){
            if(res.message){
                // TODO: notification
            }
            if(res.location){
                return context.next(res.location)
            } else {
                return context.next({name: 'home'})
            }
        }
    }
    return context.next()
}