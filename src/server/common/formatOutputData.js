function formatSingleStash(stash) {
  const single_stash = {};
  single_stash['batch_number'] = stash.batch_number;
  single_stash['stash_name'] = stash.stash_name;
  single_stash['items'] = {};
  fillBottleTypes(stash, single_stash);

  return single_stash;
}

function fillBottleTypes(stash, single_stash) {
  for (const prop in stash) {
    if (checkIfKeyIsBottleType(prop, /b\d{3}/)) {
      // single_stash.items.push({ [prop]: stash[prop] });
      single_stash.items[prop] = stash[prop];
    }
  }
}

function checkIfKeyIsBottleType(key, regex) {
  return regex.exec(key) ?
    true :
    false;
}

// export default formatSingleStash;
module.exports = {
  formatSingleStash,
};
