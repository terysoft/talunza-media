export declare const MEDIA_CATEGORIES: readonly [
  'Event filming', 'Short-form campaigns', 'Business media', 'Drama & narrative',
  'Interviews', 'Editing & post', 'AI creative support', 'Training',
  'Social content systems', 'Other media project'
];
export type MediaProjectType = typeof MEDIA_CATEGORIES[number];
export interface MediaEnquiryFields {
  category: MediaProjectType;
  location?: string;
  deadline?: string;
  deliverables?: string;
  details?: string;
}
export declare function mediaMessage(fields?: Partial<MediaEnquiryFields>): string;
export declare function mediaWhatsAppUrl(fields: MediaEnquiryFields): string;
