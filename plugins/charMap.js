// your mapping
const charMap = {
    'æ': 'ae',
    'î': 'i',
    'ø': 'o',
    // add more later
  };
  
  const regex = new RegExp(Object.keys(charMap).join('|'), 'gi');
  
  // helper function
  function normalizeString(str) {
    return str.replace(regex, match => {
      const replacement = charMap[match.toLowerCase()];
      // keep original case if needed
      return match === match.toUpperCase()
        ? replacement.toUpperCase()
        : replacement;
    });
  }
  
  export default (context, inject) => {
    // inject into Vue, context and store as $normalize
    inject('normalize', normalizeString);
    inject('charMap', charMap);
  };