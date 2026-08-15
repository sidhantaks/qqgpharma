try {
  const r = require('../routes/serviceCategoryRoutes');
  console.log('serviceCategoryRoutes type:', typeof r);
  if (r && r.stack) console.log('stack length:', r.stack.length);
} catch (e) {
  console.error('failed require serviceCategoryRoutes', e);
}
try {
  const r2 = require('../routes/serviceSubcategoryRoutes');
  console.log('serviceSubcategoryRoutes type:', typeof r2);
  if (r2 && r2.stack) console.log('stack length:', r2.stack.length);
} catch (e) {
  console.error('failed require serviceSubcategoryRoutes', e);
}
try {
  const r3 = require('../routes/integratedServiceRoutes');
  console.log('integratedServiceRoutes type:', typeof r3);
  if (r3 && r3.stack) console.log('stack length:', r3.stack.length);
} catch (e) {
  console.error('failed require integratedServiceRoutes', e);
}
