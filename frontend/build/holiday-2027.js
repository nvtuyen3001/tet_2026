/* Calendar ranges use Vietnam's timezone; end dates are inclusive. */
window.Tet2027 = {
  ranges: {
    lunarNewYear: [2027, 1, 20, 2027, 2, 20],
    solarNewYear: [2026, 12, 15, 2027, 1, 15],
    christmas: [2026, 12, 1, 2026, 12, 31]
  },
  calendar(holiday, solarToLunar) {
    const range = this.ranges[holiday];
    const start = new Date(Date.UTC(range[0], range[1] - 1, range[2]));
    const end = new Date(Date.UTC(range[3], range[4] - 1, range[5]));
    const today = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit'
    }).format(new Date());
    const target = { lunarNewYear: '2027-02-06', solarNewYear: '2027-01-01', christmas: '2026-12-25' }[holiday];
    const days = Array(start.getUTCDay()).fill(null);
    for (const cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
      const solar = cursor.getUTCDate();
      const month = cursor.getUTCMonth() + 1;
      const lunar = solarToLunar(solar, month, cursor.getUTCFullYear());
      const key = cursor.toISOString().slice(0, 10);
      days.push({ solar, lunar: lunar[0], lunarMonth: lunar[1],
        label: `${solar}/${month}`, current: key === today, holiday: key === target,
        period: holiday === 'lunarNewYear' && key >= '2027-02-04' && key <= '2027-02-10' });
    }
    while (days.length % 7) days.push(null);
    const label = date => `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
    return { days, title: `${label(start)} – ${label(end)}` };
  }
};

const holidayAssetsBase = new URL('.', document.currentScript.src);
document.addEventListener('DOMContentLoaded', async () => {
  const base = holidayAssetsBase;
  try {
    const response = await fetch(new URL('gif/manifest.json', base));
    if (!response.ok) return;
    const files = await response.json();
    if (!files.length) return;
    const image = document.createElement('img');
    image.className = 'random-gif';
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    let previous = -1;
    const change = () => {
      let index = Math.floor(Math.random() * files.length);
      if (files.length > 1 && index === previous) index = (index + 1) % files.length;
      previous = index;
      image.src = new URL(`gif/${encodeURIComponent(files[index])}`, base).href;
    };
    change();
    document.body.appendChild(image);
    window.setInterval(change, 15000);
  } catch (error) {
    console.warn('Không tải được danh sách GIF', error);
  }
});
