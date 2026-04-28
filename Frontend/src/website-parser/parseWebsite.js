import websiteTemplate from "./websiteTemplate.html?raw";

function objectToCSS(object) {
  let css = "";

  for (const [key, value] of Object.entries(object)) {
    const kebabKey = key.replace(/[A-Z]/g, capital => `-${capital.toLowerCase()}`);
    css += `${kebabKey}: ${value};\n`
  }

  return css
}

export default function parseWebsite(website, selectedElement) {
  let htmlContent = websiteTemplate;

  const navbar = website.navbar;
  const pages = website.pages;

  let navbarItems = "";
  for (const page of pages) {
    navbarItems += `<a href="#${page.name.toLowerCase()}">${page.name[0] + page.name.slice(1)}</a>\n`
  }

  const barItem = navbar.content.find(x => x.name === "Bar");
  const titleItem = navbar.content.find(x => x.name === "Title");
  const navItem = navbar.content.find(x => x.name === "Navigation");

  const navbarCss = `
    nav {
      ${objectToCSS(barItem.style)}
    }

    nav > div:first-child {
      ${objectToCSS(titleItem.style)}
    }

    nav a {
      ${objectToCSS(navItem.style)}
    }

    nav a:hover {
      color: ${barItem.style.backgroundColor};
      background-color: ${navItem.style.color};
    }`;

  htmlContent = htmlContent
    .replace(/§navbarItems§/, navbarItems)
    .replace(/§navbarCss§/, navbarCss)
    .replace(/§navbarTitle§/, titleItem.text)
    .replace(/§navbarHeight§/, barItem.style.height);

  htmlContent = htmlContent
    .replace(/§firstPage§/, pages[0].name.toLowerCase());

  let pagesHtml = "";
  let pagesCss = "";
  for (const page of pages) {

    pagesCss += `#${page.name.toLowerCase()} {
      background-color: ${page.backgroundColor};
    }`;

    let componentsHtml = "";
    for (const [componentIndex, component] of page.components.entries()) {

      let componentHtml = component.html;
      let componentCss = "";
      for (const [contentIndex, content] of component.content.entries()) {
        const idRegex = new RegExp(`class="${content.id}"`, "g");
        const idReplace = `${content.id}-${page.name.toLowerCase()}-${componentIndex}-${contentIndex}`;

        componentHtml = componentHtml.replace(idRegex, `class="${idReplace}"`);

        let contentStyle = { ...content.style };
        let additionalCss = "";

        if (content.types.includes("text") && !content.types.includes("ro-text")) {
          const textRegex = new RegExp(`§${content.id}§`, "g");

          componentHtml = componentHtml.replace(textRegex, content.text);
        }

        if (content.types.includes("container")) {
          additionalCss += "display: flex;";

          if (contentStyle.flexDirection === "column") {
            const tempAlign = contentStyle.justifyContent;
            contentStyle.justifyContent = contentStyle.alignItems;
            contentStyle.alignItems = tempAlign;
          }
        }

        if (content.hidden) {
          additionalCss += "display: none !important;";
        }

        if (selectedElement === content.id) {
          additionalCss += "box-shadow: 0 0 0 1px black, 0 0 0 2px red, 0 0 0 3px black;";
        }

        componentCss += `\n.${idReplace} {
          ${additionalCss}
          ${objectToCSS(contentStyle)}
        }`;
      }

      pagesCss += componentCss;
      componentsHtml += componentHtml;
    }

    pagesHtml += `<div class="page" id="${page.name.toLowerCase()}">
      ${componentsHtml}
    </div>`;
  }

  htmlContent = htmlContent
    .replace(/§pageContent§/, pagesHtml)
    .replace(/§pageCss§/, pagesCss);

  return htmlContent;
}
