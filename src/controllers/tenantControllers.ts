import type { Request, Response } from "express";
import {prisma} from "../../lib/prisma.js";


export const getTenant = async (req: Request, res: Response)=> {
    try {
        const {cognitoId} = req.params;
        let cId = cognitoId as string;
        const tenant = await prisma.tenant.findUnique({
            where: { cognitoId: cId },
            include: {
                favorites: true
            }
        });

        if (tenant) {
            res.json(tenant)
        } else {
            res.status(404).json({message: "Tenant not found"})
        }
    } catch (err: any) {
        res.status(500).json({message: `Error receiving tenant: ${err.message}`});
    }
}

export const createTenant = async (req: Request, res: Response)=> {
    try {
        const {cognitoId, name, email, phoneNumber} = req.body;
        const tenant = await prisma.tenant.create({
            data: {
                cognitoId,
                name,
                email,
                phoneNumber
            }
        });

        res.status(201).json(tenant)
    } catch (err: any) {
        res.status(500).json({message: `Error creating tenant: ${err.message}`});
    }
}

export const updateTenant = async (req: Request, res: Response)=> {
    try {
        const {cognitoId: id} = req.params;
        const { name, email, phoneNumber} = req.body;
        const updatedTenant = await prisma.tenant.update({
            where: { cognitoId: id as string },
            data: {
                name,
                email,
                phoneNumber
            }
        });

        res.json(updatedTenant)
    } catch (err: any) {
        res.status(500).json({message: `Error updating tenant: ${err.message}`});
    }
}