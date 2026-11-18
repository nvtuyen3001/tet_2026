(() => {
  const enhance = () => {
    document.querySelectorAll('.music-player .controls').forEach((controls) => {
      if (controls.querySelector('.favorite-btn')) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'control-btn favorite-btn';
      button.setAttribute('aria-label', 'Yêu thích bài hát');
      const audio = controls.closest('.music-player')?.querySelector('audio');
      const key = () => `tet2027-favorite:${audio?.getAttribute('src') || 'current'}`;
      const sync = () => {
        const active = localStorage.getItem(key()) === 'true';
        button.setAttribute('aria-pressed', String(active));
        button.textContent = active ? '♥' : '♡';
      };
      button.addEventListener('click', () => {
        localStorage.setItem(key(), String(button.getAttribute('aria-pressed') !== 'true'));
        sync();
      });
      sync();
      audio?.addEventListener('loadstart', sync);
      audio?.addEventListener('loadedmetadata', sync);
      controls.prepend(button);
    });
  };
  const observer = new MutationObserver(enhance);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  enhance();
})();
