// Router
var walk;
var time;

const router = app => {

    app.get('/page/:id', (request, response) => {

//        console.log(request.params.id+'page');
        response.sendFile(__dirname + '/getya.html');
    });

    app.get('/getyandex/:id', (request, response) => {
        
//        console.log(request.params.id);
        const puppeteer = require('puppeteer');   
        (async() => {
                const browser = await puppeteer.launch({
                //    headless: false
                   }) ; 
             
                const page = await browser.newPage();
                await page.goto('http://localhost:3002/page/' + request.params.id) ; 
                await page.emulateMedia('screen') ;
                
                await page.click('button[id="send"]');
                await page.click('button[id="send_m"]'); 
                
                walk = await page.evaluate(() => document.querySelector('#walk').value);
                time = await page.evaluate(() => document.querySelector('#m_all').value);

//                console.log(walk);
//                console.log(time);

                await browser.close();

                response.send({
                    time: time, 
                    walk: walk
                    
                });
        })();
     });
} 

// Export the router
module.exports = router;