import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const createSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

export const useContentSpy = (subtitles) => {
  const [activeSections, setActiveSections] = useState([]);
  const location = useLocation();
  const intersectingIdsRef = useRef(new Set());
  const subtitleElementsRef = useRef({}); // To store references to DOM elements and their positions

  // Initial active section (first subtitle) - only if no hash and no active sections
  useEffect(() => {
    if (subtitles.length > 0 && activeSections.length === 0 && !location.hash) {
      const firstSubtitle = subtitles[0];
      setActiveSections([firstSubtitle.id]);
      const slug = createSlug(firstSubtitle.text);
      window.history.replaceState(null, null, `#${slug}`);
    }
  }, [subtitles, activeSections, location.hash]);

  useEffect(() => {
    if (!subtitles || subtitles.length === 0) return;

    // Populate subtitleElementsRef
    subtitles.forEach(subtitle => {
      const element = document.getElementById(subtitle.id);
      if (element) {
        subtitleElementsRef.current[subtitle.id] = element;
      }
    });

    const observerOptions = {
      root: null,
      rootMargin: '-64px 0px -64px 0px', // Top: AppBar (64px), Bottom: 64px
      threshold: 0.01 // At least 1% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          intersectingIdsRef.current.add(entry.target.id);
        } else {
          intersectingIdsRef.current.delete(entry.target.id);
        }
      });

      // Determine active sections based on intersection and scroll position
      updateActiveSections();

      // Update hash based on the most visible intersecting entry
      const mostVisibleEntry = entries
        .filter(entry => entry.isIntersecting && entry.intersectionRatio > 0)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (mostVisibleEntry) {
        const sectionId = mostVisibleEntry.target.id;
        const subtitle = subtitles.find(sub => sub.id === sectionId);
        if (subtitle) {
          const slug = createSlug(subtitle.text);
          const newHash = `#${slug}`;
          if (location.hash !== newHash) {
            window.history.replaceState(null, null, newHash);
          }
        }
      }
    }, observerOptions);

    subtitles.forEach(subtitle => {
      const element = subtitleElementsRef.current[subtitle.id];
      if (element) {
        observer.observe(element);
      }
    });

    const updateActiveSections = () => {
      let newActiveSections = Array.from(intersectingIdsRef.current);

      if (newActiveSections.length === 0) {
        // If no subtitles are currently intersecting, find the last one that passed the reading line
        const scrollY = window.scrollY;
        const readingLine = scrollY + window.innerHeight * 0.3; // 30% down the viewport

        let lastPassedSubtitleId = null;
        // Iterate backwards to find the last subtitle whose top is above the reading line
        for (let i = subtitles.length - 1; i >= 0; i--) {
          const subtitle = subtitles[i];
          const element = subtitleElementsRef.current[subtitle.id];
          if (element && element.offsetTop <= readingLine) {
            lastPassedSubtitleId = subtitle.id;
            break;
          }
        }
        if (lastPassedSubtitleId) {
          newActiveSections = [lastPassedSubtitleId];
        } else if (subtitles.length > 0) {
          // Fallback to the first subtitle if nothing else is found (e.g., at very top of page)
          newActiveSections = [subtitles[0].id];
        }
      }
      setActiveSections(newActiveSections);
    };

    // Add scroll listener to trigger updateActiveSections more frequently
    window.addEventListener('scroll', updateActiveSections, { passive: true });

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateActiveSections);
    };
  }, [subtitles, location.hash]);

  // Handle initial hash navigation (simplified for activeSections array)
  useEffect(() => {
    if (location.hash && subtitles.length > 0) {
      const targetSlug = location.hash.substring(1);
      const targetSubtitle = subtitles.find(sub => createSlug(sub.text) === targetSlug);

      if (targetSubtitle) {
        // Cuando navegamos vía hash, aseguramos que solo esa sección esté activa inicialmente
        setActiveSections([targetSubtitle.id]);
        const targetElement = subtitleElementsRef.current[targetSubtitle.id];
        if (targetElement) {
          setTimeout(() => {
            const elementTop = targetElement.offsetTop;
            const offset = 80; // 64px AppBar + 16px padding
            window.scrollTo({
              top: elementTop - offset,
              behavior: 'smooth'
            });
          }, 100);
        }
      } else {
        // Si el hash no coincide con ningún subtítulo, por defecto el primero
        const firstSubtitle = subtitles[0];
        setActiveSections([firstSubtitle.id]);
        const slug = createSlug(firstSubtitle.text);
        window.history.replaceState(null, null, `#${slug}`);
      }
    }
  }, [location.hash, subtitles]);

  return { activeSections };
}; 