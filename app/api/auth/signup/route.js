import { connect } from '../../../utils/dbConnect';
import User from '../../../models/userModel';  
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect(); // Calls the connect function to establish a connection to the database.

export async function POST(req) { // Use 'req' instead of 'NextRequest' as the parameter name.
    // Defines an asynchronous POST request handler.
    try {
        const reqBody = await req.json(); // Use 'req' here instead of 'request'
        const { username, email, password } = reqBody;
        // Parses the request body to extract username, email, and password.

        // Checks if a user with the provided email already exists. 
        const user = await User.findOne({ email });

        // If yes, returns a 400 response.
        if (user) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Hash password using bcryptjs.
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Saves the new user to the database.
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
