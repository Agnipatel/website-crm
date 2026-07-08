export async function createGHLContacts(data: {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget?: string;
  message?: string;
  website?: string;
}) {
  try {
    const [firstName, ...rest] = data.name.trim().split(" ");

    const payload = {
      locationId: process.env.GHL_LOCATION_ID,

      firstName,
      lastName: rest.join(" "),

      email: data.email,
      phone: data.phone,

      // ✅ Correct field
      website: data.website || "",

      tags: ["Website Lead", "Website/crm"],

      customFields: [
        {
          key: "service_needed",
          fieldValue: data.propertyType,
        },
        {
          key: "monthly_marketing_budget",
          fieldValue: data.budget || "",
        },
        {
          key: "currently_facing_challenge_in_marketing_efforts",
          fieldValue: data.message || "",
        },
      ],
    };

    console.log("Payload");
    console.log(JSON.stringify(payload, null, 2));

    const apiKey = process.env.GHL_API_KEY || "";

    // pit- prefixed keys are Private Integration Tokens — use Bearer auth
    const response = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    console.log("GHL Status:", response.status);
    if (!response.ok) {
      console.error("❌ GHL API Error Response:", JSON.stringify(result, null, 2));
    } else {
      console.log("GHL Result:", result);
    }

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}