import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'some very secret key', { expiresIn: '1h' })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
        console.log(error);
    }
}

export const registration = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(400).json({ message: "User already exists" })

        if (password !== confirmPassword) return res.status(400).json({ message: "Password doesn't match" })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, fullName: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result._id }, 'some very secret key', { expiresIn: '1h' })

        res.status(200).json({ result: { _id: result._id, fullName: result.fullName, email: result.email }, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}