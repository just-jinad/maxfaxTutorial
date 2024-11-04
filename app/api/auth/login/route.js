// app/api/auth/login.js
import { connect } from '../../../utils/dbConnect';
import User from '../../../models/userModel'; 
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { username, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role, // Include role in the token
        };

        // Create a token with expiration of 1 day
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        // Send the token back in the response
        return NextResponse.json({
            message: "Login successful",
            success: true,
            token, // Send the token directly in the response
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
