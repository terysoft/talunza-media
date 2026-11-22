import type {Metadata} from 'next';

const mediaRoot = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://talunza.co.zw/media').replace(/\/$/,'');

export function mediaRouteMetadata(slug:string,title:string,description:string):Metadata {
  const canonical = mediaRoot + (slug ? '/' + slug : '') + '/';
  return {
    title,
    description,
    alternates: {canonical},
    openGraph: {
      type: 'website', locale: 'en_ZW', siteName: 'Talunza Media',
      url: canonical, title: title + ' | Talunza Media', description,
    },
    twitter: {card:'summary',title: title + ' | Talunza Media',description},
  };
}
