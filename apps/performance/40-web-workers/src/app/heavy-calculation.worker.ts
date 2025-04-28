/// <reference lib="webworker" />

const FINAL_LENGTH = 664579;

// created file with command: npx nx generate web-worker .
addEventListener('message', ({ data }) => {
  let loadingLength = 0;

  for (let num = 2; num <= 10000000; num++) {
    let randomFlag = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        randomFlag = false;
        break;
      }
    }
    if (randomFlag) {
      loadingLength++;
      postMessage((loadingLength * 100) / FINAL_LENGTH);
    }
  }
});

// Use this where needed to trigger the web worker
// if (typeof Worker !== 'undefined') {
//   // Create a new
//   const worker = new Worker(new URL('./web.worker', import.meta.url));
//   worker.onmessage = ({ data }) => {
//     console.log(`page got message ${data}`);
//   };
//   worker.postMessage('hello');
// } else {
//   // Web Workers are not supported in this environment.
//   // You should add a fallback so that your program still executes correctly.
// }
