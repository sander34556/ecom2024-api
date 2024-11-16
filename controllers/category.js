const prisma = require("../config/prisma");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await prisma.category.create({
            data: {
                name: name
            }
        })


        res.send(category)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

exports.list = async (req, res) => {
    try {
        const category = await prisma.category.findMany();

        res.send(category)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

exports.remove = async (req, res) => {
    try {
        const { id } = req.params
        const category = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })
        console.log(id);
        res.send(category)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}