function banner(type) {
  switch (type) {
    case 'website_click':
      type = 'Website';
      break;
    case 'google_search':
      type = 'Search';
      break;
    case 'journey':
      type = 'Journey';
      break;
    case 'search_journey':
      type = 'Search/Journey';
      break;
    default:
      break;
  }

  return type;
}

export default banner;
