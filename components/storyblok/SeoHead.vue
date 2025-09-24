<template>
  <span v-if="false" />
</template>

<script>
import GLOBAL from '~/constants/global'
/** current environment */
/* 
const CURRENT_ENV = process.env.ENV || 'prod'
const isProduction = CURRENT_ENV === 'prod'
 */
/** global constants **/
const { company, title, description, image, url, lang, canonical, langHrefs } = GLOBAL
const BASEURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : url
export default {
  name: 'SeoHead',
  props: {
    title: { type: String, default: () => title },
    description: {
      type: String,
      default: () => description
    },
    image: { type: String, default: () => `${image}` },
    url: { type: String, default: () => BASEURL },
    canonical: { type: String, default: () => canonical },
    langHrefs: { type: Array, default: () => langHrefs}
  },
  head() {
    const { title, description, image, url, canonical } = this
    const name = company
    const logo = image
    /*
    const structuredData = [
      {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ImageObject',
            '@id': `${url}/#primaryimage`,
            inLanguage: 'en-US',
            url: `${url}`,
            width: 1200,
            height: 628,
            caption: title
          },
          {
            '@type': 'WebPage',
            '@id': `${url}/#webpage`,
            url: `${url}`,
            name: title,
            isPartOf: {
              '@id': `${url}/#website`
            },
            image: [image],
            primaryImageOfPage: {
              '@id': `${url}/#primaryimage`,
              image
            },
            datePublished: '2020-10-08T12:10:19+00:00',
            dateModified: '2020-12-04T10:17:53+00:00',
            description,
            breadcrumb: {
              '@id': `${url}/#breadcrumb`
            },
            inLanguage: 'en-US',
            potentialAction: [
              {
                '@type': 'ReadAction',
                target: [`${url}`]
              }
            ]
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${url}/#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                item: {
                  '@type': 'WebPage',
                  '@id': url,
                  url,
                  name: 'Home'
                }
              },
              {
                '@type': 'ListItem',
                position: 2,
                item: {
                  '@type': 'WebPage',
                  '@id': `${url}/blog/`,
                  url: `${url}/blog/`,
                  name: 'Web Development and SEO blog'
                }
              },
              {
                '@type': 'ListItem',
                position: 3,
                item: {
                  '@type': 'WebPage',
                  '@id': `${url}`,
                  url: `${url}`,
                  name: title
                }
              }
            ]
          },
          {
            '@type': ['Article', 'NewsArticle'],
            '@id': `${url}/#article`,
            isPartOf: {
              '@id': `${url}/#webpage`
            },
            headline: title,
            datePublished: '2020-10-08T12:10:19+00:00',
            dateModified: '2020-12-04T10:17:53+00:00',
            mainEntityOfPage: {
              '@id': `${url}/#webpage`
            },
            image: [image],
            primaryImageOfPage: {
              '@id': `${url}/#primaryimage`,
              image
            },
            keywords:
              'Content SEO, Mobile SEO, Web Development, Nuxt.js, Next.js, GulpJS',
            description,
            inLanguage: 'en-US',
            potentialAction: [
              {
                '@type': 'ReadAction',
                name: 'Read',
                target: [`${url}/#read`]
              }
            ],
            publisher: {
              '@type': 'Organization',
              '@id': `${url}/#organization`,
              name,
              logo
            },
            author: {
              '@id': `${url}/#/schema/person/20f2f5b716256f77986451b4794a8f21`,
              url,
              name
            },
            copyrightYear: new Date().getFullYear(),
            copyrightHolder: {
              '@id': `${url}/#organization`,
              logo
            }
          }
        ]
      }
    ]
    */
    let i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    let _link = []
    if(process.env.SITE_ID!='7' && process.env.SITE_ID!='6' && process.env.SITE_ID!='8'){
      for(var i=0;i<this.langHrefs.length;i++){
        if(this.langHrefs[i].Culture.toLowerCase()!='en-gb' && this.langHrefs[i].Culture.toLowerCase()!='en' ){
          let _obj = {
                      'hid':'i18n-alt-'+this.langHrefs[i].Culture.split('-')[0],
                      'rel': 'alternate',
                      'href': process.env.LANG_HREF[this.langHrefs[i].Culture.toLowerCase()]+this.langHrefs[i].Url.replace(/ø/gi,'o'),
                      'hreflang': this.langHrefs[i].Culture.split('-')[0]
                    }
          
            _link.push(_obj)
        } 
        /*_link.push(_obj)*/
        if((this.langHrefs[i].Culture.toLowerCase()==this.$i18n.defaultLocale && process.env.SITE_ID!='3') || (this.langHrefs[i].Culture.toLowerCase()=='sv-se' && (process.env.SITE_ID=='1' || process.env.SITE_ID=='2'))){ //Kopshop uses nb-no as default language, the others sv-se
          let _obj = {
              'hid':'i18n-xd',
              'rel': 'alternate',
              'href': process.env.LANG_HREF[this.langHrefs[i].Culture.toLowerCase()] + this.langHrefs[i].Url.replace(/ø/gi,'o'),
              'hreflang': 'x-default'
            }
        _link.push(_obj)
        }
      }
    }
    if(process.env.SITE_ID=='7'){
      _link.push({
        hid: 'i18n-can',
        rel: 'canonical',
        href: `${process.env.LANG_HREF[this.$i18n.locale]}${canonical.replace(`/c/${this.$route.params.categoryid}`,`/c/${this.$route.params.parentid}/${this.$route.params.categoryid}`)}`
      })
    }else{
      _link.push({
        hid: 'i18n-can',
        rel: 'canonical',
        href: `${process.env.LANG_HREF[this.$i18n.locale]}${canonical.replace(/ø/gi,'o')}`
      })
    }
    return {
      title: title,
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: description.replace(/<p>/g,'').replace(/<\/p>/g,'').replace(/\n/g,'')
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'Article'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description.replace(/<p>/g,'').replace(/<\/p>/g,'').replace(/\n/g,'')
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: image
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: title
        },
        {
          hid: 'twitter:url',
          property: 'twitter:url',
          content: `${url}`
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title
        },
        {
          hid: 'twitter:description',
          property: 'twitter:description',
          content: description.replace(/<p>/g,'').replace(/<\/p>/g,'').replace(/\n/g,'')
        },
        {
          hid: 'twitter:image',
          property: 'twitter:image',
          content: image
        },
        {
          hid: 'twitter:image:alt',
          property: 'twitter:image:alt',
          content: title
        },
        ...i18nHead.meta
      ],
      link:_link
    }/*,
      link: [
        {
          rel: 'canonical',
          hid: 'canonical',
          href: `${canonical}`
        }
      ],*/
      /*script: [
        {
          innerHTML: JSON.stringify(structuredData),
          type: 'application/ld+json'
        }
      ],
      __dangerouslyDisableSanitizers: ['script']*/
  }
}
</script>