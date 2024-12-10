document.addEventListener('DOMContentLoaded', () => {
    const scrollElements = document.querySelectorAll('.animate-on-scroll');
  
    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };
  
    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          el.classList.add('visible');
        }
      });
    };
  
    window.addEventListener('scroll', () => {
      handleScrollAnimation();
    });
  
    // Trigger animation on load
    handleScrollAnimation();
  });


