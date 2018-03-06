// Set up all our routes and controllers 
import express from 'express';
const router = express.Router();

// Simple HTTP request 
const request = require('request'); 

// Simple HTTP Request Useing Promises 
const Q = require('q');
require('any-promise/register/q');
const rp = require('request-promise-any');

router.get('/test', (req, res) => { 
  res.json({
    "name": "Andrew Nguyen",
    "age": 22,
    "height": "5'8\"",
    "occupation": "Front End Developer",
    "company": "Brand Value Accelerator"
  });
})

/*******************************************************************************
 * *****************************************************************************
  _________        .__  .__ ___.                  __            
  \_   ___ \_____  |  | |  |\_ |__ _____    ____ |  | __  ______
  /    \  \/\__  \ |  | |  | | __ \\__  \ _/ ___\|  |/ / /  ___/
  \     \____/ __ \|  |_|  |_| \_\ \/ __ \\  \___|    <  \___ \ 
  \______  (____  /____/____/___  (____  /\___  >__|_ \/____  >
          \/     \/              \/     \/     \/     \/     \/ 

  Making async call using callbacks. Dummy endpoint provided by 
  https://jsonplaceholder.typicode.com/ 

********************************************************************************
*******************************************************************************/

// COOL TRIANGLE BROOO 🙌 💯 😤
router.get('/callback', (req, res) => {

  // Level 1 😄
  request('https://jsonplaceholder.typicode.com/posts', (error, response, body) => {
    const [post] = JSON.parse(body); 
    
    // Level 2 😃
    request('https://jsonplaceholder.typicode.com/users', (error, response, body) => {
      const [user] = JSON.parse(body); 

      // Level 3 😅
      request('https://jsonplaceholder.typicode.com/photos', (error, response, body) => {
        const [photo] = JSON.parse(body); 

        // Level 4 🙄
        request('https://jsonplaceholder.typicode.com/albums', (error, response, body) => {
          const [album] = JSON.parse(body); 

          // Level 5 😡
          request('https://jsonplaceholder.typicode.com/comments', (error, response, body) => {
            const [comment] = JSON.parse(body); 
            
            const data = [post, user, photo, album, comment];
            res.json({
              data
            });

          });

        });
      });

    });

  });
})

/*******************************************************************************
 * *****************************************************************************
 __________                       .__                      
\______   \_______  ____   _____ |__| ______ ____   ______
 |     ___/\_  __ \/  _ \ /     \|  |/  ___// __ \ /  ___/
 |    |     |  | \(  <_> )  Y Y  \  |\___ \\  ___/ \___ \ 
 |____|     |__|   \____/|__|_|  /__/____  >\___  >____  >
                               \/        \/     \/     \/ 

  Making async call using promises. Dummy endpoint provided by 
  https://jsonplaceholder.typicode.com/ 

********************************************************************************
*******************************************************************************/
router.get('/promiseChain', (req, res) => {

  rp('https://jsonplaceholder.typicode.com/posts')
  .then( (data) => {
    // Do something with this data 
    console.log(JSON.parse(data)[0]); 
    return rp('https://jsonplaceholder.typicode.com/users');
  })
  .then( (data) => {
    // Do something with data from returned promise
    res.json(JSON.parse(data)[0]); 
    // Return another one if you want. 
  })
  .catch( (err) => {
    // Do something with error 
  })
})
 

router.get('/promiseAll', (req, res) => {

  // RP is used to make HTTP requests based on promises
  const postPromise = rp('https://jsonplaceholder.typicode.com/posts'),
        userPromise = rp('https://jsonplaceholder.typicode.com/users'),
        photoPromise = rp('https://jsonplaceholder.typicode.com/photos'),
        albumPromise = rp('https://jsonplaceholder.typicode.com/albums'),
        commentPromise = rp('https://jsonplaceholder.typicode.com/comments');

  // Q is a promise library
  Q.all([postPromise, userPromise, photoPromise, albumPromise, commentPromise])
    .then(([postData, userData, photoData, albumData, commentData]) => {

      // ES6 Destructuring assignment to get first of datas
      const [post] = JSON.parse(postData), 
            [user] = JSON.parse(userData), 
            [photo] = JSON.parse(photoData), 
            [album] = JSON.parse(albumData), 
            [comment] = JSON.parse(commentData); 
      
      const data = [post, user, photo, album, comment]; 
      
      res.json({
        data
      })
    })
    .catch((err) => {
      // Do something with err
    })
})

router.get('/promiseAwait', async (req, res) => {

  try {
    const postPromise = await rp('https://jsonplaceholder.typicode.com/posts'),
          userPromise = await rp('https://jsonplaceholder.typicode.com/users'),
          photoPromise = await rp('https://jsonplaceholder.typicode.com/photos'),
          albumPromise = await rp('https://jsonplaceholder.typicode.com/albums'),
          commentPromise = await rp('https://jsonplaceholder.typicode.com/comments');
  } catch (err) {
    // Do something with err
  }

  const [post] = JSON.parse(postPromise), 
        [user] = JSON.parse(userPromise), 
        [photo] = JSON.parse(photoPromise), 
        [album] = JSON.parse(albumPromise), 
        [comment] = JSON.parse(commentPromise); 
  
  const data = [post, user, photo, album, comment]; 

  res.json({
    data
  })
})

export default router;
