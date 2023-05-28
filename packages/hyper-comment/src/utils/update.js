const MarkdownIt = require('markdown-it');
const { Window } = require('happy-dom');
const detectNewlineGraceful = require('./detect-newline');

class Update {
  constructor(content) {
    this.content = content;

    this.document = this.initDocument();
  }

  getMarkdownHtml() {
    const newline = detectNewlineGraceful(this.content);
    const METADATA_END = `${newline}---${newline}`;
    
    let text = this.content;
    const metadataEndIndex = text.indexOf(METADATA_END);
    if (metadataEndIndex !== -1) {
      text = text.substring(metadataEndIndex + METADATA_END.length);
    }
  
    const markdownIt = MarkdownIt({
      breaks: true,
      linkify: true, 
      typographer: true,
      html: true,
    });

    return markdownIt.render(text);
  }

  initDocument() {
    const window = new Window();
    const document = window.document;
    document.body.innerHTML = this.getMarkdownHtml();
    
    return document;
  }

  
  run({
    parentTagName,
    parentIndex,
    textOffset,
    extra,
    id,
  }) {
    const { document } = this;
    const elements = document.body.querySelectorAll(parentTagName);
  
    if (!elements[parentIndex]) {
      return text;
    }
  
    let tagOffset = 0;
    const nodes = elements[parentIndex].childNodes;
    for(let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const nextTagOffset = tagOffset + node.textContent.length;
  
      if (tagOffset < textOffset && textOffset <= nextTagOffset) {
        const text = node.textContent;
        const offset = textOffset - tagOffset;
        const newText = text.slice(0, offset) + `<span data-uuid="${id}"${extra ? ` data-cmt-id="${extra.cmtId}"` : ''}></span>` + text.slice(offset);
      
        this.content = this.content.replace(text, newText);
        return;
      }

      tagOffset = nextTagOffset;
    }

    return text;
  }

  toString() {
    return this.content;
  }
}

module.exports = function updateContent(content, source) {
  const update = new Update(content);
  update.run({ ...source.startMeta, extra: source.extra, id: source.id });
  update.run({ ...source.endMeta, id: source.id });
  
  return update.toString();
}