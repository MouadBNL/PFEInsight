import { NavigationGuardNext, RouteLocationNormalized } from "vue-router"
import role from "./role";
export interface MiddlewareContext {
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
}

export default function checkMiddlewares(
    context: MiddlewareContext,
    middlewares: Array<any>,
    roles:string|string[] = []
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
    if(roles && roles.length > 0) {
        const rolesContext = role(roles)
        if(rolesContext !== true) {
            return context.next(rolesContext.location)
        }
    }
    return context.next()
}