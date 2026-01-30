import type { Request, Response } from "express";
import {prisma} from "../../lib/prisma.js";


export const getManager = async (req: Request, res: Response)=> {
    try {
        const {cognitoId} = req.params;
        const cId  = cognitoId as string;
        const manager = await prisma.manager.findUnique({
            where: { cognitoId: cId },
        });

        if (manager) {
            res.json(manager)
        } else {
            res.status(404).json({message: "Manager not found"})
        }
    } catch (err: any) {
        res.status(500).json({message: `Error receiving manager: ${err.message}`});
    }
}

export const createManager = async (req: Request, res: Response)=> {
    try {
        const {cognitoId, name, email, phoneNumber} = req.body;
        const manager = await prisma.manager.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber
            }
        });

        res.status(201).json(manager);
    } catch (err: any) {
        res.status(500).json({message: `Error creating tenant: ${err.message}`});
    }
}