// Smoothly scrolls to a recipe when its dropdown link is hovered.
document.querySelectorAll('.rollover-menu a').forEach((recipeLink) => {
  recipeLink.addEventListener('mouseenter', () => {
    const recipeSection = document.querySelector(recipeLink.getAttribute('href'));

    if (recipeSection) {
      recipeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
