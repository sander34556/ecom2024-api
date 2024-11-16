const prisma = require("../config/prisma");

exports.changeOrderStatus = async (req, res) => {
    try {
        const { orderId, orderStatus } = req.body

        const orderUpdate = await prisma.order.update({
            where: { id: Number(orderId) },
            data: { orderStatus: orderStatus }
        })

        res.json(orderUpdate)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }
}

exports.getOrderAdmin = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                products: {
                    include: {
                        product: true
                    }
                },orderedBy:{
                    select:{
                        id:true,
                        email:true,
                        address:true,
                    }
                }
                
            }
        })

        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' })
    }
}