window.addEventListener("load", function () {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const init = async () => {
    await delay(2000);

    const mainContent = document.querySelector("#contentMain");
    if (!mainContent)
      return;

    const hazPlusIcon = mainContent.querySelector(".PaidIconstyled__PaidIcon-sc-19nr71-0");
    if (!hazPlusIcon)
      return;

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

    firstTexBlock.style.height = "auto";

    try {
      const parsedObject = JSON.parse(jsonString);
      console.log(parsedObject);
      parsedObject.elements.forEach((element) => {
        if (
          element.type === "ad" ||
          element.type === "moreItems" ||
          element.type === "piano" ||
          element.type === "newsletterAd"
        ) {
          return;
        }
        var textElement;
        if (element.type === "text") {
          textElement = document.createElement("p");
        } else if (element.type === "header") {
          textElement = document.createElement("h2");
        }

        if (textElement) {
          if (textElement.tagName === "P"){
            textElement.classList.add('gqSIEH')
          } else if(textElement.tagName === "H2") {
            textElement.classList.add('Headlinestyled__Headline-sc-mamptc-0', 'headline')
          }
          const textNode = document.createTextNode(element.text);
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
