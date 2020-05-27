import Vue from 'vue';
import get from './_get';

Vue.prototype.$get = get;

Vue.prototype.$try = function (fn, fallbackValue) {
  try {
    return fn();
  } catch (e) {
    return fallbackValue;
  }
};

Vue.prototype.$getCMSEntry = function (entries, entryname, fallbackValue) {
  var valuetoret = fallbackValue;
  var foundEntry = false;
  try {
    if (entries && 'function' === typeof (entries.filter)) {
      entries.filter(function (entry) {
        if (entry.name == entryname) {
          if (entry.dimension_value != null) {
            valuetoret = entry.dimension_value;
          } else {
            console.log("Entry for entryname: " + entryname + " found i CMS, but dimension value is null, showing default instead: " + fallbackValue)
          }
          foundEntry = true;
        }
      })

      if (!foundEntry)
        console.log("Entry for entryname: " + entryname + " not found i CMS, showing default instead: " + fallbackValue)
    }
  } catch (err) {
    console.log(err)
  }
  return valuetoret;
};
