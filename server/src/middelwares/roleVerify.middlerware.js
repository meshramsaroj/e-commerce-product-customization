const verifyAdmin = async (req, _, next) => {
    const { role } = req.user

    if (role !== "admin") {
        throw new Error("Only admin can have this access")
    }

    next()

}

export {
    verifyAdmin
}