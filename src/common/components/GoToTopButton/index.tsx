import { useState, useEffect } from 'react';

import { ArrowUpwardIcon, Container } from './styles';

type GoToTopButton = {
  elementId?: string;
};

export function GoToTopButton({ elementId }: GoToTopButton): JSX.Element {
  const [visible, setVisible] = useState(false);

  function handleScrollToTop() {
    if (elementId) {
      return document.getElementById(elementId)?.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }

    return window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    function setIsVisible() {
      const currentElementScroll =
        document.getElementById(elementId || '')?.scrollTop || 0;
      const currentScroll = document.documentElement.scrollTop;

      if ((currentElementScroll || currentScroll) >= 300) setVisible(true);
      else setVisible(false);
    }

    if (elementId) {
      document
        .getElementById(elementId)
        ?.addEventListener('scroll', setIsVisible);
    } else window.addEventListener('scroll', setIsVisible);

    return () => window.removeEventListener('scroll', setIsVisible);
  }, []); // eslint-disable-line

  return visible ? (
    <Container onClick={handleScrollToTop}>
      <ArrowUpwardIcon />
    </Container>
  ) : (
    <></>
  );
}
