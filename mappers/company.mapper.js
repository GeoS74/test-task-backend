module.exports = (data) => ({
  id: data.id,
  inn: data.inn,
  title: data.title || null,
  address: data.address || null,
  tel: data.tel || null,
});
