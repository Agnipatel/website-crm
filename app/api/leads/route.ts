import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Lead from "@/lib/models/Lead";
import nodemailer from "nodemailer";
import { createGHLContacts } from "@/lib/ghl";

// ========================
// GET ALL LEADS
// ========================
export async function GET() {
  try {
    await connectDB();

    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      {
        success: true,
        count: leads.length,
        data: leads,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET Leads Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leads",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// ========================
// CREATE LEAD
// ========================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      location,
      website,
      source,
      services = [],
      budget,
      message,
    } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, Email and Phone are required",
        },
        { status: 400 }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address",
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Check duplicate lead
    const existingLead = await Lead.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingLead) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Lead already exists with this email or phone number",
        },
        { status: 409 }
      );
    }

    // Save Lead
    const newLead = await Lead.create({
      name,
      email,
      phone,
      location: location || "",
      website: website || "",
      source: source || "Website",
      services: services,
      budget: budget || "",
      message: message || "",
    });

    console.log("✅ Lead Saved:", newLead._id);

    // ========================
    // GoHighLevel CRM
    // ========================
    try {
    const ghlResponse = await createGHLContacts({
  name,
  email,
  phone,
  propertyType:
    services.length > 0
      ? services.join(", ")
      : "General Inquiry",
  budget,
  message,
  website,
});
      console.log("✅ GHL Contact Created");
      console.log(ghlResponse);
    } catch (ghlError) {
      console.error("❌ GHL Error:", ghlError);
    }

    // ========================
    // Prepare services string for email
    // ========================
    const servicesStr =
      services.length > 0 ? services.join(", ") : "N/A";

    // ========================
    // Email Notification
    // ========================
    if (
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS
    ) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to:
            process.env.EMAIL_TO ||
            process.env.EMAIL_USER,
          subject: `New IVF Audit Lead - ${name}`,
          html: `
            <h2>New IVF Audit Lead Received</h2>

            <table border="1" cellpadding="8" cellspacing="0">
              <tr>
                <td><strong>Name</strong></td>
                <td>${name}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>${email}</td>
              </tr>
              <tr>
                <td><strong>Phone</strong></td>
                <td>${phone}</td>
              </tr>
              <tr>
                <td><strong>Location</strong></td>
                <td>${location || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Website</strong></td>
                <td>${website || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Source</strong></td>
                <td>${source || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Services</strong></td>
                <td>${servicesStr}</td>
              </tr>
              <tr>
                <td><strong>Budget</strong></td>
                <td>${budget || "N/A"}</td>
              </tr>
              <tr>
                <td><strong>Message</strong></td>
                <td>${message || "N/A"}</td>
              </tr>
            </table>
          `,
        });

        console.log("✅ Email Sent");
      } catch (emailError) {
        console.error(
          "❌ Email Sending Error:",
          emailError
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        lead: newLead,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST Lead Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create lead",
        error: error.message,
      },
      { status: 500 }
    );
  }
}