const fs = require('fs');

const getAllTalkers = async () => {
  try {
    const result = JSON.parse(fs.readFileSync('src/talker.json', 'utf-8'));
    return result;
  } catch (err) {
    return null;
  }
};

module.exports = { getAllTalkers };