const apiResponse = [
  { request_id: "req_001", delay: 800, max_time: 1000 },
  { request_id: "req_002", delay: 1300, max_time: 1400 },
  { request_id: "req_003", delay: 2000, max_time: 800 },
  { request_id: "req_004", delay: 1200, max_time: 1200 },
  { request_id: "req_005", delay: 1500, max_time: 900 },
];

// Simulate API call based purely on delay and max_time
function simulateApiCall(apiData) {
  return new Promise((resolve, reject) => {
    if (apiData?.delay > apiData?.max_time) {
      // Will take too long → fail
      setTimeout(() => reject("Timeout"), apiData?.max_time);
    } else {
      // Will succeed
      setTimeout(() => resolve({ message: "Success" }), apiData?.delay);
    }
  });
}

// Array of promises for each API call
const promises = apiResponse.map((apiData) =>
  simulateApiCall(apiData)
    .then((value) => ({
      request_id: apiData.request_id,
      status: "fulfilled",
      value,
    }))
    .catch((reason) => ({
      request_id: apiData.request_id,
      status: "rejected",
      reason,
    })),
);

// running all promises concurrently and collecting results
Promise.allSettled(promises).then((results) => {
  const STATUS_FULFILLED = "fulfilled";
  const STATUS_REJECTED = "rejected";

  const successful = results.filter((r) => r.value.status === STATUS_FULFILLED);
  const failed = results.filter((r) => r.value.status === STATUS_REJECTED);

  console.log("Final Report:");
  console.log("Successful Responses:", successful);
  console.log("Failed Responses:", failed);
});
