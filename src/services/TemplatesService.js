const { pool } = require('../db');

const checkconflicts = (id, tenant) => new Promise((resolve, reject) => {
  try {
    let query;
    if (id !== undefined) {
      query = `select a.template_id, b.template_id as conflict from ${tenant}.attrs a \
      INNER JOIN ${tenant}.attrs b on a.label = b.label and a.template_id <> b.template_id \
      where a.template_id in ${id}
      group by a.template_id, b.template_id order by a.template_id, b.template_id`;
    } else {
      query = `select a.template_id, b.template_id as conflict from ${tenant}.attrs a \
      INNER JOIN ${tenant}.attrs b on a.label = b.label and a.template_id <> b.template_id \
      group by a.template_id, b.template_id order by a.template_id, b.template_id`;
    }

    pool.query(query)
      .then((data) => {
        const result = {};
        data.rows.forEach((item) => {
          result[item.template_id] = result[item.template_id] === undefined
            ? result[item.template_id] = [item.conflict]
            : result[item.template_id] = result[item.template_id].concat(item.conflict);
        });
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  } catch (e) {
    reject(e);
  }
});
module.exports = { checkconflicts };
