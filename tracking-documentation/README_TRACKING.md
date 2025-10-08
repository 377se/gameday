# 🚀 Unified Tracking System - START HERE

**One API → All Platforms (GTM, Google Ads, Meta, GA4)**

---

## ✅ Status: READY TO USE

- ✅ **Code migrated** (9 files updated)
- ✅ **Nuxt configs updated** (13 files)
- ✅ **Event hub built** (server-side)
- ✅ **Platform adapters ready** (Google Ads, Meta, GA4)
- ⏳ **Need:** Add `.env` variables and test

---

## 📚 Documentation (3 Files)

| File | Purpose |
|------|---------|
| **README_TRACKING.md** | This file - Quick start |
| **FINAL_SUMMARY.md** | Complete guide - architecture, setup, testing |
| **ENV_VARIABLES_COMPLETE.md** | Copy-paste all env variables |
| **COOKIE_STRATEGY.md** | How attribution cookies work |

---

## ⚡ Quick Start (15 Minutes)

### 1. Add Environment Variables

Copy from **ENV_VARIABLES_COMPLETE.md** to your `.env` file:

**Minimum to start (Google Ads only):**
```bash
# Example for Gameday
GOOGLE_ADS_ENABLED_GAMEDAY=true
GOOGLE_ADS_CONVERSION_ID_GAMEDAY=AW-123456789       ← Get from Google Ads
GOOGLE_ADS_PURCHASE_LABEL_GAMEDAY=abc123            ← Get from Google Ads
GOOGLE_ADS_ADD_TO_CART_LABEL_GAMEDAY=def456         ← Get from Google Ads
GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_GAMEDAY=ghi789      ← Get from Google Ads
```

Repeat for each site you want to track.

---

### 2. Test Locally

```bash
# Start dev server
npm run dev:gameday

# Open browser console
console.log(window.$track)
# Should show: {track: ƒ, viewItem: ƒ, addToCart: ƒ, ...}

# Test an event
$track.viewItem({
  ProductId: '123',
  Name: 'Test Product',
  Price: 99.99,
  HeadCategory: 'Test',
  BrandName: 'Test'
})

# Check Network tab
# Should see: POST /webapi/tracking/event
# Response: {success: true, platforms: {gtm: ✓, googleAds: ✓}}
```

---

### 3. Verify GTM Still Works

1. Install [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Navigate your site
3. Check dataLayer events:
   - ✓ ViewContent appears
   - ✓ AddToCart appears
   - ✓ purchase appears

**If GTM works → Google Ads works too!**

---

### 4. Deploy

```bash
npm run build:gameday
npm run start:gameday
```

---

## 🎯 How It Works

### Before (OLD):
```javascript
// 3+ calls for one event
this.$gtm.push({event: 'AddToCart', ...})
zaraz.track('AddToCart', ...)
zaraz.ecommerce('Product Added', ...)
```

### After (NEW):
```javascript
// ONE call distributes to ALL platforms
this.$track.addToCart(product, 1)
```

### Magic Routing:

```
Component:
  this.$track.purchase({...})
      ↓
  Automatically includes: siteId = 6 (from process.env.SITE_ID)
      ↓
  POST /webapi/tracking/event { siteId: 6, ... }
      ↓
Server Event Hub:
  SITE_CONFIGS[6]  ← Gets Gameday's specific config
      ↓
  Uses Gameday's credentials:
  - Google Ads: AW-GAMEDAY-123
  - Meta Pixel: GAMEDAY-PIXEL-456
      ↓
All Platforms:
  ✓ GTM (dataLayer)
  ✓ Google Ads (Gameday account)
  ✓ Meta Ads (Gameday pixel)
  ✓ GA4 (Gameday property)
```

**Each site automatically uses its own credentials!** ✅

---

## 📊 Events Tracked

| Event | Trigger | Platforms |
|-------|---------|-----------|
| `page_view` | Route change (auto) | GTM, GA4 |
| `view_item` | Product page | GTM, Google Ads, Meta, GA4 |
| `view_item_list` | Category page | GTM, GA4 |
| `add_to_cart` | Add to cart button | GTM, Google Ads, Meta, GA4 |
| `begin_checkout` | Checkout page load | GTM, Google Ads, Meta, GA4 |
| `purchase` | Order complete | GTM, Google Ads, Meta, GA4 |

---

## ✅ What's Already Done

### Nuxt Configs (13 files):
- ✅ nuxt.config.js
- ✅ nuxt.config.samdodds.js (+ .se, .dev, .test)
- ✅ nuxt.config.kopshop.js
- ✅ nuxt.config.supportersplace.js (+ .se, .fi, .no)
- ✅ nuxt.config.streetweek.js
- ✅ nuxt.config.laxen.js (+ .dev)

### Component Files (9 files):
- ✅ PageArticle.vue
- ✅ ArticleDetails.vue
- ✅ ArticleDetailsSpurs.vue
- ✅ Category pages
- ✅ Checkout page
- ✅ Purchase confirmation
- ✅ Login page
- ✅ Contact page
- ✅ Team article pages

**No more code changes needed!**

---

## 🎯 Credential Quick Reference

### Per Site You Need:

**Google Ads (5 variables):**
- Conversion ID (AW-XXXXXXXXX)
- Purchase label
- Add to cart label
- Begin checkout label
- Enabled flag

**Meta Ads (3 variables - optional):**
- Pixel ID
- Access Token
- Enabled flag

**GA4 (3 variables - optional):**
- Measurement ID
- API Secret
- Enabled flag

**Total per site:** 11 variables  
**Total for 6 sites:** 66 variables

**But start with just Google Ads:** 5 vars × 6 sites = 30 variables

---

## 🚀 Platform Activation

```bash
# Google Ads - Set to true when you have credentials
GOOGLE_ADS_ENABLED_GAMEDAY=true

# Meta Ads - Set to true when ready (can be later)
META_ADS_ENABLED_GAMEDAY=false

# GA4 - Set to true when ready (can be later)
GA4_ENABLED_GAMEDAY=false
```

**Just flip enabled=true to activate any platform!**

---

## 📞 Need Help?

**Full Guide:** See `FINAL_SUMMARY.md`  
**Env Variables:** See `ENV_VARIABLES_COMPLETE.md`  
**Cookie System:** See `COOKIE_STRATEGY.md`

---

## 🎉 Summary

✅ **ONE LINE** replaces all tracking code  
✅ **ONE .env FILE** controls all platforms  
✅ **AUTOMATIC** site-specific routing  
✅ **GTM** still works (backward compatible)  
✅ **READY** for Google Ads, Meta, GA4  

**Next:** Add env variables and test! 🚀

