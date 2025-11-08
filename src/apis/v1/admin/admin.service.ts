import { Types } from "mongoose";
import env from "../../../environment/env";
import AdminModel, { IAdminModel } from "../../../models/admin.model";
import RoleModel from "../../../models/role.model";
import { LoggerUtil, OpenId } from "../../../utils";
import passwordUtil from "../../../utils/password.util";
import { ServiceResponse } from "../../../interfaces";
import { DB_MODELS, HttpStatus } from "../../../constants";
import { ICreateAdminPayload } from "./interfaces/create";
import { IListAdminQuery } from "./interfaces/list";
import { IChangePasswordPayload } from "./interfaces/change-password";

class AdminService {

    private logger = new LoggerUtil('AdminService');
    async createAdmin() {
        const email = env.ADMIN_EMAIL;
        const password = env.ADMIN_PASSWORD;
        const name = env.ADMIN_NAME;
        const encryptedPassword = await passwordUtil.encrypt(password);

        const isExists = await AdminModel.findOne({ email });
        if (isExists) {
            this.logger.log("Admin already exists");
        } else {
            const role = await RoleModel.findOne({ name: 'SUPER_ADMIN' });
            await AdminModel.create({
                email,
                password: encryptedPassword,
                name,
                roleId: role._id
            });
            this.logger.log("Admin created");
        }

        return true;
    }


    async myProfile(id: Types.ObjectId | string): Promise<ServiceResponse> {
        const admin = await AdminModel.aggregate([
            {
                $match: {
                    _id: new Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roleId',
                    foreignField: '_id',
                    as: 'role'
                }
            },
            {
                $set: {
                    role: {
                        $first: '$role'
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    role: {
                        _id: 1,
                        name: 1,
                        permissions: 1
                    }

                }
            }
        ]);

        return {
            status: HttpStatus.Ok,
            message: 'admin_profile_fetched',
            data: {
                admin
            }
        }
    }


    async create(payload: ICreateAdminPayload): Promise<ServiceResponse> {
        const { email, name, countryCode, phoneNumber, roleName } = payload;
        let isExists = await AdminModel.findOne({ email });
        if (isExists) return { status: HttpStatus.BadRequest, message: 'admin_already_exists' };
        if (countryCode && phoneNumber) {
            isExists = await AdminModel.findOne({ countryCode, phone: phoneNumber });
            if (isExists) return { status: HttpStatus.BadRequest, message: 'admin_already_exists' };
        }
        const password = OpenId.password();
        const encryptedPassword = await passwordUtil.encrypt(password);
        const role = await RoleModel.findOne({ name: roleName });
        if (!role) return { status: HttpStatus.BadRequest, message: 'invalid_role_name' };
        const admin = await AdminModel.create({
            email,
            displayId: OpenId.generate(6),
            password: encryptedPassword,
            name,
            countryCode,
            phone: phoneNumber,
            roleId: role._id
        });
        return {
            status: HttpStatus.Created, message: 'admin_created', data: {
                _id: admin._id,
                displayId: admin.displayId
            }
        };
    }


    async list(query: IListAdminQuery): Promise<ServiceResponse> {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 10;
        const skip = (page - 1) * limit;
        const result = await AdminModel.aggregate([
            {
                $match: {
                    isDeleted: false
                }
            },
            {
                $facet: {
                    count: [
                        { $count: 'count' }
                    ],
                    list: [
                        { $skip: skip },
                        { $limit: limit },
                        {
                            $lookup: {
                                from: DB_MODELS.ROLE,
                                localField: 'roleId',
                                foreignField: '_id',
                                as: 'role'
                            }
                        },
                        {
                            $set: {
                                role: {
                                    $first: '$role'
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                displayId: 1,
                                name: 1,
                                email: 1,
                                countryCode: 1,
                                phoneNumber: 1,
                                createdAt: 1,
                                role: {
                                    _id: 1,
                                    name: 1,
                                }
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    count: { $first: '$count.count' },
                    list: 1
                }
            }
        ]);

        return {
            status: HttpStatus.Ok,
            message: 'admins_list',
            data: {
                page,
                limit,
                ...result[0],
            }
        }
    }


    async delete(id: string, admin: IAdminModel): Promise<ServiceResponse> {
        const isExists = await AdminModel.findById(id);
        if (!isExists) return { status: HttpStatus.BadRequest, message: 'admin_not_found' };
        if (admin._id.toString() === id) return { status: HttpStatus.BadRequest, message: 'cannot_delete_yourself' };
        await AdminModel.findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy: admin._id,
                name: '@D_name',
                email: `d_${new Date().getTime()}@deleted.com`,
                countryCode: '0000',
                phoneNumber: '0000000000',
                isActive: false
            }
        );
        return { status: HttpStatus.Ok, message: 'admin_deleted' };
    }

    async changePassword(payload: IChangePasswordPayload, adminId: Types.ObjectId): Promise<ServiceResponse> {
        const { currentPassword, newPassword } = payload;
        const admin = await AdminModel.findById(adminId);
        const isMatch = await passwordUtil.compare(currentPassword, admin.password);
        if (!isMatch) return {
            status: HttpStatus.BadRequest,
            message: 'invalid_password'
        };
        const encryptedPassword = await passwordUtil.encrypt(newPassword);
        await AdminModel.findByIdAndUpdate(
            adminId,
            { password: encryptedPassword }
        );
        return { status: HttpStatus.Ok, message: 'admin_password_changed' };
    }
}


export default new AdminService();