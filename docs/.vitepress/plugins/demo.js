module.exports = function demoPlugin(md) {
  const RE = /<demo /i;

  md.renderer.rules.html_inline = (tokens, idx) => {
    console.log("tokens: ", tokens);
    console.log("tokens: ", tokens[idx]);
    const content = tokens[idx].content;
    console.log("content: ", content);
    // console.log("tokens, idx: ", tokens, idx);

    if (RE.test(content.trim())) {
      console.log("content: ", content);
    }

    return content;
  };
};
