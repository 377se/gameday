<template>
  <div class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-bottom">
    <template v-if="$fetchState.pending">
        <div uk-grid class="uk-grid uk-grid-small uk-grid-stack">
          <section class="uk-width-1-1 uk-width-1-2@m">
            <content-placeholders
              :rounded="true">
              <content-placeholders-img 
                class="ph-article-img"/>
            </content-placeholders>
          </section>
          <section class="uk-width-1-1 uk-width-1-2@m">
            <content-placeholders
              :rounded="true">
              <content-placeholders-heading />
              <content-placeholders-text :lines="5" />
            </content-placeholders>
          </section>
        </div>
      </template>
      <template
        v-else>
        <div class="uk-container uk-container-large uk-padding-small uk-padding-remove-top">
          <ul
            v-if="metadata.Breadcrumb && metadata.Breadcrumb.length>0" 
            class="uk-breadcrumb">
            <li>
              <nuxt-link :to="localePath('/')">
                <span style="vertical-align: bottom;
                  margin-bottom: 2px;" uk-icon="icon:home;ratio:0.7"/></nuxt-link></li>
            <li
              v-for="(b,index) in metadata.Breadcrumb[0].ItemList"
              :key="index">
              <nuxt-link 
                v-if="b.Url"
                :to="localePath(b.Url)">{{ b.Name }}</nuxt-link>
              <span v-else>{{ b.Name }}</span>
            </li>
          </ul>
        </div>
        <ArticleDetails 
          v-bind:article="article"
          :league="league"/>
      </template>
  </div>
</template>

<script>
import ArticleDetails from "@/components/articles/ArticleDetails";

export default {
   head () {
    let _link = new Array()
    for(var i=0;i<this.metadata.LangHref.length;i++){
      let _obj = {
                  'hid':'i18n-alt-'+this.metadata.LangHref[i].Culture.split('-')[0],
                  'rel': 'alternate',
                  'href': this.metadata.LangHref[i].Url,
                  'hreflang': this.metadata.LangHref[i].Culture.split('-')[0]
                }
      if(this.siteid!=2 || (this.siteid!=2 && this.metadata.LangHref[i].Culture!='en-gb')){
        _link.push(_obj)
      } 
      if(this.metadata.LangHref[i].Culture==this.$i18n.defaultLocale){
        let _obj = {
                  'hid':'i18n-xd',
                  'rel': 'alternate',
                  'href': this.metadata.LangHref[i].Url,
                  'hreflang': 'x-default'
                }
      _link.push(_obj)
      }
    }
    _link.push(
      {
        rel: 'canonical',
        hid: 'i18n-can',
        href: this.metadata.Canonical
      }
    )
    return {
      title: this.article.MetaTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.MetaDescription
        },
        {
          hid: 'og:title',
          name:  'og:title',
          content:  this.article.MetaTitle,
        },
        {
          hid: 'og:description',
          name:  'og:description',
          content: `${this.article.MetaDescription}`.replace(/<\/?[^>]+(>|$)/g, ""),
        }
      ],
      link:_link
    }
  },
  components: {
    ArticleDetails
  },
  data() {
    return {
      article: {},
      metadata: {Canonical:this.$route.path, LangHref:[]},
      siteid: process.env.SITE_ID,
      league:''
    }
  },
  async fetch() {
    try {
      const url = `/webapi/${this.$i18n.locale}/Article/GetArticleDetailsById?teamName=null&articleId=${this.$route.params.id}`;
      const metadataurl = `/webapi/${this.$i18n.locale}/MetaData/GetMetaData=${this.$route.path}`;
      const article = await this.$axios.$get(url);
      const metadata = await this.$axios.$get(metadataurl);
 
      this.article=article
      this.metadata = metadata
      var _this = this
      try{
        this.$gtm.push({event:'ViewContent',
          data: {
            content_name: _this.article.Name,
            content_category: _this.article.HeadCategory,
            content_ids: [_this.article.ArticleNumber],
            content_type: 'product',
            value: _this.article.Price.toFixed(2),
            currency: process.env.CURRENCY_CODE
          }
        })
      }catch(err){
        console.log(err)
      }

      try{
        this.league=this.metadata.Breadcrumb[0].ItemList[0].Name
      }catch(err){
        console.log(err)
      }

    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss">
</style>
