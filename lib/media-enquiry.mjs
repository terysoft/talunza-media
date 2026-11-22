/** Local-only TALUNZA Media quote formatter. Never sends a request. */
const PHONE = '263777323918';
export const MEDIA_CATEGORIES = Object.freeze([
  'Event filming', 'Short-form campaigns', 'Business media',
  'Drama & narrative', 'Interviews', 'Editing & post',
  'AI creative support', 'Training', 'Social content systems',
  'Other media project',
]);
const clean = (value, limit = 280) =>
  String(value ?? '').replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, limit);
export function mediaMessage({ category = '', location = '', deadline = '', deliverables = '', details = '' } = {}) {
  const type = clean(category, 80);
  if (!MEDIA_CATEGORIES.includes(type)) throw new Error('Choose a valid media project type.');
  const fields = [
    ['Project', type],
    ['Location', clean(location, 100)],
    ['Date / deadline', clean(deadline, 100)],
    ['Delivery format', clean(deliverables, 140)],
    ['Brief', clean(details, 1000)],
  ];
  return [
    'Hello TALUNZA Media. I would like a quote for a project.',
    ...fields.filter(([,value]) => value).map(([label,value]) => label + ': ' + value),
    'Please advise on scope, availability and next steps.',
  ].join('\n');
}
export function mediaWhatsAppUrl(fields) {
  return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(mediaMessage(fields));
}
