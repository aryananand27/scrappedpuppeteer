const { all } = require('axios');
const puppeteer = require('puppeteer');
let singledata;

(async () => {
    let goa=[];
    
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

   
    await page.goto('https://www.stayvista.com/goa/villas-in-goa', { waitUntil: 'networkidle2',timeout:0 });
    
    
    
    
    // Extract the villa data
    // console.log("hello")
    const villas = await page.evaluate(() => {
        // Fetch all villa cards
        let ans=[];
        let allspans=[];
        let allp=[];
        let alldiv=[];
        let allimg=[];
            
        let data=document.querySelectorAll(".CityPageContent_city_page_card_root__5gizh")[0];
        let name=document.querySelectorAll(".CityPageCard_city_page_card_titleblock_heading__EodE0")[0].innerText;
        let subcity=name.split('-')[1].trim();
        let maxGuests=document.querySelectorAll(".CityPageCard_city_page_card_config_elem_block__CTD_3")[0].innerText.split(" ")[1];
        let noOfRooms=document.querySelectorAll(".CityPageCard_city_page_card_config_elem_block__CTD_3")[1].innerText.split(" ")[0];
        let noOfBedrooms=document.querySelectorAll(".CityPageCard_city_page_card_config_elem_block__CTD_3")[1].innerText.split(" ")[0];
        let noOfBathrooms=document.querySelectorAll(".CityPageCard_city_page_card_config_elem_block__CTD_3")[2].innerText.split(" ")[0];

       
            let spandata=data.querySelectorAll("span");
            let divdata=data.querySelectorAll("div");
            let pdata=data.querySelectorAll("p");
            let imgdata=data.querySelectorAll("img");
            imgdata.forEach((element)=>{
                allimg.push(element.src)
            });
            
            
            spandata.forEach(element => {
                if(element.textContent){
                    allspans.push(element.textContent);
                }
               
            });
          
            divdata.forEach(element => {
                if(element.textContent){
                    alldiv.push(element.textContent);
                }
            });
           
            pdata.forEach(element => {
                if(element.textContent){
                    allp.push(element.textContent);
                }
               
            });
            singledata={
                pricePerNight:alldiv[alldiv.length-3]? alldiv[alldiv.length-3]: null,
                amenities:[`${alldiv[alldiv.length-9]}`,`${alldiv[alldiv.length-10]}`,`${alldiv[alldiv.length-11]}`,`${alldiv[alldiv.length-12]}`],
                noOfBathrooms:noOfBathrooms,
                noOfBedrooms:noOfBedrooms,
                noOfRooms:noOfRooms,
                maxGuests:maxGuests,
                rating:alldiv[alldiv.length-23][0]?Number(alldiv[alldiv.length-22][0]) : null,
                country:"India",
                state:"Maharashtra",
                name:name,
                city:"Mumbai",
                hotelType:"Villa",
                companyName:"Ukiyo",
                address:null,
                locationpin:null,
                isLuxe:false,
                isFeatured:false,
                isExecutive:false,
                hotelOverview:allp[1]?`${allp[1]}`:null,
                images:[`${allimg[1]}`,`${allimg[4]}`,`${allimg[6]}`,`${allimg[7]}`,`${allimg[9]}`],
                subcity:subcity
            }
            ans.push(allspans);
            ans.push(alldiv);
            ans.push(allp);


           return singledata;
            
    });

    
   console.log(villas);

   
})();




