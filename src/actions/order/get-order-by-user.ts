"use server"

import { CurrentUser } from "@/lib/auth";
import prisma from "@/lib/db";

export const getOrderByUser = async () => {
    const user = await CurrentUser(); 

    if(!user){
        return{
            ok:false,
            message:"No autenticado"
        }
    }

    const orders = await prisma.order.findMany({
        where:{
            userId: user.id
        },
        include:{
            address:{
                select:{
                    city:true,
                    region:true,
                    address:true
                }
            },
            user:{
                select:{
                    name:true,
                    email:true
                }
            }
        }
    })

    return {
        ok:true,
        orders:orders,
    }

}