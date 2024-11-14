import cloudinary from '../../config/cloudinary';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file');

        if (!file) {
            console.error("File not found in form data.");
            return NextResponse.json({ error: 'File is missing' }, { status: 400 });
        }

        // Convert the file to Base64
        const buffer = await file.arrayBuffer();
        const base64String = Buffer.from(buffer).toString('base64');
        const dataURI = `data:${file.type};base64,${base64String}`;

        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'maxFax_quiz_images'
        });

        console.log("Upload successful, URL:", result.secure_url); // Log the URL to confirm
        return NextResponse.json({ url: result.secure_url }, { status: 200 });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
    }
}

