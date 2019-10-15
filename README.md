# The Community Toolbox Team RedPanda
  Brandon El Haj, Ryan Kaw, Peter Tardif, Jeanine Hoffman, Shawn Jackson
  Last Updated: Oct 8, 2019
  – C O N F I D E N T I A L –
  Team Red Panda- All Rights Reserved.

## Overview
  The Community Toolbox is an app that allows community run lending libraries work more efficiently in their areas. With slight adaptations the app is designed to help users find the tools they need for home improvement and garden/lawn care tasks without the investment cost and need for storage of seldom used, bulky tools.

  The app allows for the end user to create an account, log in, search for tools with predictive text, learn details about each tool, and reserve the tools they need. Iterations can and will involve a log in for admin use: to add/delete tools or communicate with end users. Also, links to YouTube videos that explain the use of tools or common projects to help teach and encourage people to participate in the upkeep of their homes.

  The Community Toolbox is made to be reworked to meet the specific needs of different community resources. The model is set up as a co-op but wording and graphics can be altered to suit the individual needs of customers.

### Scenarios
  In designing products, it helps to imagine a few real life stories of how actual (stereotypical) people would use them. We’ll look at two scenarios.

    Scenario 1: John
    John’s a busy young guy with no experience keeping up a home and yard. When he inherited the small home his grandmother had lived in, he figured it would be great to just pay the taxes and live rent free with a paid off mortgage. What John didn’t factor in was the cost of updating the scant tools left behind in the house he now owned. Nor did he think about the constant upkeep that a home requires. 

    His first big surprise was when a tree fell in his yard. He didn’t have the money to pay someone to come deal with it but he didn’t want to buy a cheap chainsaw that he might never use again. His solution came when a contractor he had called for an estimate told him about a local co-op that let people borrow tools for projects just like his.

    John hopped online on his phone, found a chainsaw and went in to the co-op to join and learn how to use the tool. Within a few hours that tree was cut up and set in a stack to dry out and age for use in the fireplace his grandmother had once enjoyed.

    Scenario 2: Jamie
    Jamie bought her starter home with the money she had been saving since her teens. The housing market in her home of Portland, OR meant that Jamie had to pay more for her home than she was comfortable with but it was perfect for her small son and their dog. When Jamie noticed a gap in the fencing, she was concerned about the dog or even her son, trying to get out of the backyard, or worse, something coming in that could harm them while they played.
    
    Jamie called around and after getting estimates that ranged from guys trying to bully her into buying an entirely new fence to an offer by someone to ‘slap a board over the gap and call it good’ she decided to investigate on YouTube how to repair it herself.

    One video led to another and soon she was itching to go but the cost of the supplies would nearly tap her small savings. A neighbor told her about The Community Toolbox and Jamie jumped on her phone and downloaded the app. Soon, she had the tools she needed, the supplies she had bought, and her fence was repaired.

#### Non Goals
  This version will not support the following features:

  * multiple time zones for one member. All members are assumed to be in the     same time zone.

  * changing passwords.

  * appointments.

  * users (other than a potential administrator) adding or deleting tools.

##### The Community  Flowchart

  What everyone wants to know is how does it flow for our users? Here it is with more detail to follow:

  Screen by Screen Specification:

  The Community Toolbox uses as few screens as possible but some are unavoidable. Most screens will follow a standard format, with a look and feel to be re-designed if needed by a customer, or our original artwork can be retained. This document is more concerned with the functionality and the interaction design, not the exact look and layout.

  Each screen has the same header and navigation bar, allowing for easy access to everything.

  Landing page screen:
    Every page opens with the logo, navigation bar. The landing page allows for a search bar under the title includes predictive text and a display that starts with all tools available in a three column grid format on desktop and scales to one column for mobile.

    The footer also contains links to the same elements as the nav bar, a slot for the brick and mortar address, and space for an admin/webmaster link if requested.

    The login in will return the user to the landing page with the added functionality of being able to reserve a tool from the tool detail screen.
    screen shot:
    <img src="./src/ReadMeAssets/LandingPage.png" alt="search landing page view" /> 

  ** Technical Note **
  
  The search bar uses predictive text logic that enables searches by tool name, category, or partial name.

  Tool Detail Page:
    The tool page is accessed by clicking on the Tools Detail link on the main page. There is an enlarged image of the tool, a description of the tool with details about tool power, construction and/or usage.There are buttons to bring the user back to browse or to click to reserve. Upon reservation, the number in their basket (on the nave bar once the user is logged in) increases by one and the item is added to their cart.
    screenshot:
    <img src="./src/ReadMeAssets/ToolDetail.png" alt="Tool detail view" /> 

  Log In Form:
    The Log In Form is used by current members to log into their accounts in order to find out the current time. It looks like this:
    screen shot:
    <img src="./src/ReadMeAssets/login.png" alt="log in page view" /> 

    ** Technical Note**
    The password currently requires a capitalized letter, a lowercase letter, a number and a symbol. To disguise them and prevent hacking, as the user types in the password box, asterisks (*) will appear instead of the characters that they type. This is accomplished using <INPUT TYPE=PASSWORD>
  
    When the user clicks Log In, the following check are performed on the server:

    * If the email address and password are OK, jump straight to search for tools

  Registration Form:
    This requires a first and last name, an email address, optional account nick name, and a password meeting the criteria set out in the placeholder
    screen shot:
    <img src="./src/ReadMeAssets/Registration.png" alt="Registration view" /> 
  
  About Us Page:
    The page gives new or returning users the background of the brick and mortar and sets expectations for their use of the app and the service.
    screen shot:
    <img src="./src/ReadMeAssets/Aboutpg.png" alt="About us page view" /> 

  Cart View:
    screen shot:
    <img src="./src/ReadMeAssets/cartviewe.png" alt="the cart view" /> 

  Check Out:
  This view includes google map that is clickable to get the end user to your location.
  screen shot:
  <img src="./src/ReadMeAssets/checkout.png" alt="checkout page view" /> 

###### The Tech Stack:
    
    The front end is built using minimal HTML, JS, & JQuery. The build relies heavily on React and CSS for the bulk of the front end with the use of an external API for Cloudinary to host images for faster caching, and Google Maps to aid in end users finding your location. 

    The back end is built in Node.js,Postgresql and uses express and knex. The database is structured into four tables: 
      Tools-which contains all the tools the location has available to browse and data is parsed from there to show details. 
      Users- stores the user information gathered at the creation of the account.
      Checkouts-This table gets the tool ID the user is reserving and links it to the user id and adds a return date. The date can be refactored for individual clients of course, and is currently set to a default return of four days from the date the end user reserves.
      Users-tool-list- This table is used for the storage of the tools a user wishes to reserve in their shopping cart. 

      Authentication is currently completed using JWT but with the future option for O-Auth based on our client's needs. 

      Our demo is available at https://toolbox-client-git-master.teamredpanda.now.sh/
      Demo Login:Demo   Password: Demo1234!