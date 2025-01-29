
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from 'express'
import * as user from "../services/user"

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await user.createUser(req.body);
    res.send(createResponse(result, "User created sucssefully"))
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await user.updateUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

export const editUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await user.editUser(req.params.id, req.body);
    res.send(createResponse(result, "User updated sucssefully"))
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await user.deleteUser(req.params.id);
    res.send(createResponse(result, "User deleted sucssefully"))
});


export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const result = await user.getUserById(req.params.id);
    res.send(createResponse(result))
});


export const getAllUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await user.getAllUser();
    res.send(createResponse(result))
});

export const getLoggedInUser = asyncHandler(async (req: Request, res: Response) => {
    const id = req.user?._id;
    const result = await user.getUserById(id || "");
    res.send(createResponse(result))
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const result = await user.loginUser(email, password);
    res.send(createResponse(result));
})
