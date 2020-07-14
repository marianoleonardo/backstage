const templateService = require('../services/TemplatesService');
const { pool } = require('../db/index');


// eslint-disable-next-line no-undef
test('Test the query functions', () => {
  // eslint-disable-next-line no-undef
  pool.query = jest.fn().mockResolvedValue({
    rows: [{ template_id: 1, conflict: 2 },
      { template_id: 1, conflict: 3 },
      { template_id: 1, conflict: 4 },
      { template_id: 1, conflict: 5 },
      { template_id: 1, conflict: 6 },
      { template_id: 1, conflict: 7 },
      { template_id: 1, conflict: 8 },
      { template_id: 1, conflict: 9 },
      { template_id: 1, conflict: 10 }],
  });

  templateService.checkconflicts(1, 'admin')
    .then((data) => {
      // eslint-disable-next-line no-undef
      expect(data).toMatchObject({
        1: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      });
    });

  templateService.checkconflicts(undefined, 'admin')
    .then((data) => {
      // eslint-disable-next-line no-undef
      expect(data).toMatchObject({
        1: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      });
    });


  // eslint-disable-next-line no-undef
  pool.query = jest.fn().mockRejectedValue({
    query: 'data not found',
  });

  templateService.checkconflicts(undefined, 'admin')
    .catch((err) => {
      // eslint-disable-next-line no-undef
      expect(err).toMatchObject({
        query: 'data not found',
      });
    });

  // eslint-disable-next-line no-undef
  pool.query = 1;

  templateService.checkconflicts(undefined, 'admin')
    .catch((err) => {
      // eslint-disable-next-line no-undef
      expect(err).toBeInstanceOf(Error);
    });
});
