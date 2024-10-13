window.addEventListener('load', function() {
    const fusion = document.getElementById('fusion-metadata')
    const jsonString = fusion.innerHTML.split(';Fusion.')[4].replace('globalContent=', '')
    const parentDiv = document.querySelector('.ArticleHeadstyled__ArticleTeaserContainer-sc-tdzyy5-3')
    const firstTexBlock = document.querySelector('.Textstyled__Text-sc-1cqv9mi-0')

    firstTexBlock.style.height = "auto"

    try {
        const parsedObject = JSON.parse(jsonString)
        console.log(parsedObject)
        parsedObject.elements.forEach(element => {
            if (element.type === "ad" || element.type === "moreItems") {
                return
            }
            const p = document.createElement('p')
            const textNode = document.createTextNode(element.text)
            parentDiv.appendChild(document.createTextNode(element.text))
        });
    }catch (error) {
        console.log(error)  
    }
})

