import { 
    getAllUsersService, 
    getUserByIdService, 
    createUserService, 
    updateUserPutService, 
    updateUserPatchService,
    deleteUserService,
} from '../services/userService.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const getAllUsers = async (_req, res) => {
    try {
        const users = await getAllUsersService();
        sendSuccess(res, users);
    } catch (error) {
        console.error(error);
        sendError(res);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserByIdService(id);
        if (!user){
            return sendError(res, HTTP_STATUS.NOT_FOUND);
        }
        sendSuccess(res, user);
    } catch (error) {
        console.error(error);
        sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const result = await createUserService(userData);
        sendSuccess(res, { id: result.insertId, ...userData }, HTTP_STATUS.CREATED);
    } catch (error) {
        console.error(error);
        sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};

export const updateUser = async (req, res) => {
    const result = await updateUserPutService(req.params.id, req.body);
    if (!result.affectedRows) {
        return sendError(res, HTTP_STATUS.NOT_FOUND);
    }
    sendSuccess(res, { id: +req.params.id, ...req.body });
};

export const updateUserPatch = async (req, res) => {
    const result = await updateUserPatchService(req.params.id, req.body);
    if (!result.affectedRows) {
        return sendError(res, HTTP_STATUS.NOT_FOUND);
    }
    sendSuccess(res, { id: +req.params.id, ...req.body });
};


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteUserService(id);
        if (result.affectedRows === 0) {
            return sendError(res, HTTP_STATUS.NOT_FOUND);
        }
        sendSuccess(res, HTTP_STATUS.DELETE_SUCCESS, HTTP_STATUS.NO_CONTENT);
    } catch (error) {
        console.error(error);
        sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
};