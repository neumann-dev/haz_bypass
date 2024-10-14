window.addEventListener("load", function () {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const init = async () => {
    await delay(2000);

    const mainContent = document.querySelector("#contentMain");
    if (!mainContent)
      return;

    //Check if the Article has a paywall
    const hazPlusIcon = mainContent.querySelector(".PaidIconstyled__PaidIcon-sc-19nr71-0");
    if (!hazPlusIcon)
      return;

    //Get the object that contains the text and trim it to later parse it to an JSON object
    const fusion = document.querySelector("#fusion-metadata");
    const jsonString = fusion.innerHTML
      .split(";Fusion.")[4]
      .replace("globalContent=", "");
    const parentDiv = document.querySelector(
      ".ArticleHeadstyled__ArticleTeaserContainer-sc-tdzyy5-3"
    );
    const firstTexBlock = document.querySelector(
      ".Textstyled__Text-sc-1cqv9mi-0"
    );

    //Set the text boxs height to auto to fit the whole text and remove the paywall element
    firstTexBlock.style.height = "auto";
    document.querySelector('.Articlestyled__PaywallWrapper-sc-7y75gq-5').remove()

    //Parse the trimmed object as an JSON Object
    try {
      const parsedObject = JSON.parse(jsonString);
      console.log(parsedObject);
      //Filter for unwanted elements like ads
      parsedObject.elements.forEach((element) => {
        if (
          element.type === "ad" ||
          element.type === "moreItems" ||
          element.type === "piano" ||
          element.type === "newsletterAd"
        ) {
          return;
        }
        //Check what type the element is and creat an HTML element based on that
        var textElement;
        if (element.type === "text") {
          textElement = document.createElement("p");
        } else if (element.type === "header") {
          textElement = document.createElement("h2");
        }
        
        if (textElement) {
          //Add diffrent classes based on what element we created to add styling
          if (textElement.tagName === "P"){
            textElement.classList.add('gqSIEH')
          } else if(textElement.tagName === "H2") {
            textElement.classList.add('Headlinestyled__Headline-sc-mamptc-0', 'headline')
          }
          //Add the text to the text box and replace unwanted tags that won't have any use since they are added as plain text
          const textNode = document.createTextNode(element.text.replace(/<[^>]*>/g, ''));
          textElement.appendChild(textNode);
          parentDiv.appendChild(textElement);
        }
        
      });
    } catch (error) {
      console.log(error);
    }
  };
  init();
});
