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

    const response = await fetch(
      "https://services.leadconnectorhq.com/contacts/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GHL_API_KEY}`,
          Version: "2021-07-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    console.log("Status:", response.status);
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}