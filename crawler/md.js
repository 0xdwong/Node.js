const { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } = require('node-html-markdown');
const fs = require('fs');


function main(){
    let html = fs.readFileSync('xx.html');
    let r = NodeHtmlMarkdown.translate(
      /* html */ html,
      /* options (optional) */ {},
      /* customTranslators (optional) */ undefined,
      /* customCodeBlockTranslators (optional) */ undefined
    );
    
    console.log(r);
    fs.writeFileSync('xx.md', r);
}

main();