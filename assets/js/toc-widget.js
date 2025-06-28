document.addEventListener('DOMContentLoaded', function() {
  const tocWidget = document.getElementById('widget-toc');
  if (!tocWidget) return;
  
  const tocList = document.getElementById('toc-list');
  
  // Generate TOC from headings
  function generateTOC() {
    const headings = document.querySelectorAll('.post__content h1, .post__content h2, .post__content h3, .post__content h4');
    
    if (headings.length === 0) {
      tocWidget.style.display = 'none';
      return;
    }
    
    headings.forEach(heading => {
      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = heading.textContent.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      }
      
      const level = parseInt(heading.tagName.charAt(1));
      const title = heading.textContent.trim();
      const id = heading.id;
      
      const listItem = document.createElement('li');
      listItem.className = `toc-item toc-h${level}`;
      
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.className = 'toc-link';
      link.textContent = title;
      
      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });
  }
  
  // Highlight active TOC item on scroll
  function updateActiveTocItem() {
    const headings = document.querySelectorAll('.post__content h1, .post__content h2, .post__content h3, .post__content h4');
    let activeId = '';
    headings.forEach(heading => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom > 100) {
        activeId = heading.id;
      }
    });
    // Remove active class from all links
    document.querySelectorAll('.toc-link').forEach(link => {
      link.classList.remove('active');
    });
    // Add active class to current section
    if (activeId) {
      const activeLink = document.querySelector(`.toc-link[href="#${activeId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }
  
  // Smooth scrolling for TOC links
  function setupTocLinks() {
    document.querySelectorAll('.toc-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Initialize TOC
  generateTOC();
  setupTocLinks();
  
  window.addEventListener('scroll', updateActiveTocItem);
  window.addEventListener('resize', updateActiveTocItem);
  updateActiveTocItem();
}); 