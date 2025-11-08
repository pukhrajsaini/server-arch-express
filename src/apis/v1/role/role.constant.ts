import { IPermissions } from "../../../models/role.model"

export enum AppModules {
    Admin = 'ADMIN',
    School = 'SCHOOL',
    Dashboard = 'DASHBOARD',
}


export enum ApiActions {
    Create = 'CREATE',
    Read = 'READ',
    Update = 'UPDATE',
    Delete = 'DELETE',
    Status = 'STATUS',
}


const permissions:IPermissions[] = Object.values(AppModules).map((module) => ({ entity: module, actions: Object.values(ApiActions) }))


export const ROLES = [
    {
        name: 'SUPER_ADMIN',
        permissions,
    }
]