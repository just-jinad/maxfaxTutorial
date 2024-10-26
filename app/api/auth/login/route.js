import { connect } from '../../../utils/dbConnect';
import User from '../../../models/userModel'; 
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect(); // Calls the connect function to establish a connection to the database.

export async function POST(req) { // Change 'NextRequest' to 'req'
    try {
        const reqBody = await req.json(); // Use 'req' instead of 'request'
        const { username, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        
        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password); // Ensure this is one line
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email, // Make sure to use user.email, as email was not previously defined.
        };

        // Create a token with expiration of 1 day
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        // Create a JSON response indicating successful login
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        // Set the token as an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
