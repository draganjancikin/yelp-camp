const mongoose = require("mongoose");
const Comment = require("./models/comment")
const Campground = require("./models/campground");

const data = [
  {
    name: "Ekna - Naturcamp",
    image: "/camp-ekna-naturcamping.jpeg",
    description: "Bacon ipsum dolor amet ham pork chop t-bone, meatball ball tip alcatra filet mignon tail hamburger. Corned beef shoulder frankfurter landjaeger, turkey hamburger pork loin tongue leberkas ground round drumstick. Chicken venison jowl, jerky tri-tip pig shankle biltong pancetta ground round bacon kevin. Strip steak drumstick t-bone ribeye beef salami shoulder jerky kielbasa porchetta chuck sirloin alcatra swine. Pork loin bresaola turkey boudin."
  },
  {
    name: "Golden Ears",
    image: "/camp-golden-ears.jpeg",
    description: "Chislic beef jowl corned beef frankfurter. Strip steak ball tip sirloin ribeye doner. Beef fatback burgdoggen t-bone ham, capicola filet mignon jerky beef ribs kevin short ribs. Fatback swine prosciutto, alcatra beef ribs porchetta sausage. Strip steak ham hock jerky meatloaf. Doner strip steak short loin pork sausage shankle."
  },
  {
    name: "Lac D Amour",
    image: "/camp-lac-d-amour.jpeg",
    description: "Ribeye cupim short loin picanha frankfurter. Tenderloin frankfurter cupim pork turkey t-bone bresaola burgdoggen spare ribs ground round beef ribs capicola alcatra prosciutto jerky. Shankle kevin kielbasa pig, tongue sausage flank spare ribs bacon rump meatball beef ribs. Pork chop short ribs andouille ham. Doner corned beef ham hock, ball tip prosciutto tail swine meatball alcatra fatback pastrami burgdoggen kielbasa biltong. Andouille pancetta ham tenderloin chislic picanha beef meatball meatloaf rump chuck short loin flank kevin."
  },
];

function seedDB() {
  // Remove all campgrounds
  Campground.deleteMany({}, (err) => {
      if (err) {
          console.log(err);
      } else {
          console.log("Removed campgounds!");
          // Add a few campgrounds
          data.forEach((seed) => {
              Campground.create(seed, (err, campground) => {
                  if (err) {
                      console.log(err);
                  } else {
                      console.log("Added a campground!!!");
                      // create a comment
                      Comment.create(
                        {
                          text: "Does your lorem ipsum ...",
                          author: "Dragan"
                        }, (err, comment) => {
                          if (err) {
                            console.log(err);
                          } else {
                            // save comment to campground
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment!");
                          }
                        }
                      );
                  }
              });
          });
      }
  });

  // Add a few comments

}

module.exports = seedDB;
