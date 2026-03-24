// Utility function to copy text to clipboard and open a new tab
export const copyAndOpenTab = async (item, extCode) => {
  let msg = item?.google_search?.search_phrase;

  if (typeof msg === 'object') {
    msg = JSON.stringify(msg);
  }

  try {
    await navigator.clipboard.writeText(msg);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }

  setTimeout(() => {
    window.open(`https://google.com?tk=${item.task_code}&cd=${extCode}`, '_blank');
  }, 1000);
};
