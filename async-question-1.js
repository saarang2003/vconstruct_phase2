// making a notification schedular

// components
// 1 -> sendNotification(user , notificationNum) -> takes user object and notification number and have setimtout
// function with 1000ms delay , makes sure it runs sequnectially ( output for that notification are configured manually as of now
// so we takes resolve and reject based on output array index value
//) 2- controlledfunction( users) -> takes listof users and then loop it by sequnectially calling
// sendfunction with notiofication num -> makes sure it only calls the sendnottification funuction inside try catch
// to get output for each promise and looks for it's output success or failed
// counter are used for
//
//
//
const data = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  { id: 4, name: "Diana Prince", email: "diana@example.com" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com" },
];

function sendNotifications(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Artificially generate result (random)
      const isSuccess = Math.random() < 0.7; // 70% chance success
      const result = isSuccess ? "success" : "failed";

      console.log(`Notification for user: ${user.name} (${user.id})`);

      if (result === "success") {
        console.log(`✅ Notification sent successfully to ${user.name}`);
        resolve(result);
      } else {
        console.log(`❌ Notification failed for ${user.name}`);
        reject(result);
      }
    }, 1000);
  });
}

async function ControllerFunction(users) {
  let attempted = 0;
  let successfulAttempts = 0;
  let failedAttempts = 0;

  for (const user of users) {
    console.log(`sending notification to ${user.name}`);

    try {
      let res = await sendNotifications(user);
      console.log("output from first user:", res);
      successfulAttempts++;
    } catch (error) {
      console.log("Error:", error);
      failedAttempts++;
    }
    attempted++;
  }

  console.log("\n--- Summary ---");
  console.log("Total Attempts:", attempted);
  console.log("Total Success:", successfulAttempts);
  console.log("Total Failed:", failedAttempts);
}
// Run and then print summary
(async () => {
  await ControllerFunction(data);
})();

// // This one is first method i tried -> manually sequnectial operaiton with promise chaining.

// const notificationOne = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("First Notification runs");
//       resolve("Notification 1 completed");
//       attempted++;
//     }, 1000);
//   });

// const notificationTwo = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Second Notification runs");
//       reject("Notification 2 failed");
//       attempted++;
//     }, 2000);
//   });

// const notificationThree = () =>
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("Third Notification runs");
//       resolve("Notification 3 Success");
//       attempted++;
//     }, 3000);
//   });

// // Sequential execution with proper handling
// notificationOne()
//   .then((result1) => {
//     console.log("Result from notification 1:", result1);
//     successfulAttempts++;
//     return notificationTwo(); // return next promise
//   })
//   .catch((err1) => {
//     console.log("Error occurred in notification 1:", err1);
//     failedAttempts++;
//     return notificationTwo(); // continue sequentially even if first fails
//   })
//   .then((result2) => {
//     console.log("Result from notification 2:", result2);
//     successfulAttempts++;
//     return notificationThree(); // next
//   })
//   .catch((err2) => {
//     console.log("Error occurred in notification 2:", err2);
//     failedAttempts++;
//     return notificationThree(); // continue
//   })
//   .then((result3) => {
//     console.log("Result from notification 3:", result3);
//     successfulAttempts++;
//   })
//   .catch((err3) => {
//     console.log("Error occurred in notification 3:", err3);
//     failedAttempts++;
//   })
//   .finally(() => {
//     console.log("Attempted:", attempted);
//     console.log("Successful:", successfulAttempts);
//     console.log("Failed:", failedAttempts);
//   });
