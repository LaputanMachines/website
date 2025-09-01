// Random gradient generator for article backgrounds
(function() {
  'use strict';

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
    'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    'linear-gradient(135deg, #fdbb2d 0%, #22c1c3 100%)',
    'linear-gradient(135deg, #ff8a80 0%, #ea6100 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  ];

  function generateGradient(articleId) {
    let hash = 0;
    for (let i = 0; i < articleId.length; i++) {
      const char = articleId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  }

  function applyGradients() {
    const gradientElements = document.querySelectorAll('.article__gradient-bg, .recent-posts__gradient-bg, .post-featured-gradient-bg, .prev__gradient-bg, .next__gradient-bg');
    
    gradientElements.forEach(function(element) {
      const gradientId = element.getAttribute('data-gradient-id');
      if (gradientId) {
        const gradient = generateGradient(gradientId);
        element.style.background = gradient;
      }
    });
  }

  function applyGradientsImmediate() {
    requestAnimationFrame(function() {
      applyGradients();
    });
  }

  applyGradientsImmediate();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyGradients);
  } else {
    applyGradients();
  }

  if (typeof window !== 'undefined') {
    window.applyArticleGradients = applyGradients;
  }
})();
