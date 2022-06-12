
const transitions = (() => {

  const handleTransEnd = element => {
    return new Promise((resolve) => {
      const callback = (e) => {
        e.stopPropagation();
        element.classList.remove('transition');
        resolve(callback);
      }
      element.addEventListener('transitionend', callback);
    }).then((callback) => {
      element.removeEventListener('transitionend', callback);
    });
  }

  return {
    fadeInOut: element => {
      if (element.classList.contains('hidden')) {
        element.classList.add('transition');
        element.clientHeight;
        element.classList.remove('hidden');
      } else {
        element.classList.add('transition');
        element.classList.add('hidden');
      }
      return handleTransEnd(element);
    },
    fadeIn: element => {
      if (element.classList.contains('hidden')) {
        element.classList.add('transition');
        element.clientHeight;
        element.classList.remove('hidden');
        return handleTransEnd(element);
      }
    },
    fadeOut: element => {
      if (!element.classList.contains('hidden')) {
        element.classList.add('transition');
        element.classList.add('hidden');
        return handleTransEnd(element);
      }
    },
  }
})()

export default transitions;