importScripts('./../../src/shared/services/shared-service-script.js');


// worker.js
onmessage = function (event) {
    console.log('Received message from the main thread:', event.data);
  
    // Perform some computation
    for (let i = 0; i < 1000000000; i++) {
        let val = 5+54;        
    }

    let sh = new SharedService();
    sh.test();
    
    // const result = event.data * 2;
    event.data.val = 1;
    console.log(event);

    // Send the result back to the main thread
    postMessage(true);
  };