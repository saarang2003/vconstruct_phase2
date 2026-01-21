const apiResponse = [
  {
    request_id: "REQ_101",
    payload: {
      user: {
        id: 1,
        name: "john doe",
        email: "john@example.com",
      },
    },
    status: "success",
  },
  {
    request_id: "REQ_102",
    payload: {},
    status: "failed",
  },
];

// What You Need to Do
// Safely read API data
// Handle missing nested fields without causing runtime errors.
// Normalize the responses
// Convert backend-style keys to frontend-friendly keys.
// Format string values consistently.
// Generate a summary
// Count total API requests.
// Count successful responses.
// Organize processing logic
// Store processed data inside an object.
// Use object methods and this to manage state.
// Preserve data integrity
// Do not mutate the original API response array.

// const normalized = apiResponses.map(item => ({
//   requestId: item.request_id,
//   status: item.status,
//   userId: item.payload?.user?.id ?? "N/A",
//   userName: item.payload?.user?.name ?? "N/A",
//   userEmail: item.payload?.user?.email?.toLowerCase() ?? "N/A"
// }));

const normalizedData = apiResponse.map((item) => ({
  requestId: item.request_id,
  status: item?.status,
  userId: item?.payload?.user?.id ?? "N/A",
  userName:
    item?.payload?.user?.name
      ?.split(" ")
      .map((u) => u[0].toUpperCase() + u.slice(1))
      .join(" ") ?? "N/A",
  userEmail: item?.payload?.user?.email?.toLowerCase() ?? "N/A",
}));

console.log(normalizedData);


const ProcessedObject = {

    // Step 1: store normalized data as a property
  normalizedData: apiResponse.map((item) => ({
    requestId: item.request_id,
    status: item.status ?? "N/A",
    userId: item.payload?.user?.id ?? "N/A",
    userName:
      item.payload?.user?.name
        ?.split(" ")
        .map((u) => u[0].toUpperCase() + u.slice(1))
        .join(" ") ?? "N/A",
    userEmail: item.payload?.user?.email?.toLowerCase() ?? "N/A",
  })),

    // Step 2: method to count total requests
  totalApiRequest() {
    return this.normalizedData.length;
  },

  // Step 3: method to count successful responses
  countSuccessfulApi() {
    return this.normalizedData.filter((u) => u.status === "success").length;
  },

    getSummary() {
    return {
      totalRequests: this.totalApiRequest(),
      successfulRequests: this.countSuccessfulApi(),
      failedRequests:
        this.totalApiRequest() - this.countSuccessfulApi(),
    };
  },
}

  // Test it
console.log("Normalized Data:", ProcessedObject.normalizedData);
console.log("Total Requests:", ProcessedObject.totalApiRequest());
console.log("Successful Requests:", ProcessedObject.countSuccessfulApi());
console.log("Summary:", ProcessedObject.getSummary());
