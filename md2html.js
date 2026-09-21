document.querySelectorAll('article').forEach(article => {
    const markdown = article.textContent;
    article.innerHTML = marked.parse(markdown);
});