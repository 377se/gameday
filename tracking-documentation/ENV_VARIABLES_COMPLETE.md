# Complete .env Variables - Copy & Paste

Copy everything below to your `.env` file and fill in your actual credentials.

---

```bash
# ============================================
# UNIFIED TRACKING SYSTEM - ALL SITES
# ============================================


# ============================================
# SITE 1: SUPPORTERS PLACE
# ============================================

# Google Ads API
GOOGLE_ADS_ENABLED_SP=true
GOOGLE_ADS_CONVERSION_ID_SP=AW-XXXXXXXXX
GOOGLE_ADS_PURCHASE_LABEL_SP=abc123xyz
GOOGLE_ADS_ADD_TO_CART_LABEL_SP=def456uvw
GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_SP=ghi789rst
GOOGLE_ADS_DEVELOPER_TOKEN_SP=your_developer_token
GOOGLE_ADS_ACCESS_TOKEN_SP=your_oauth_access_token

# Meta Ads
META_ADS_ENABLED_SP=false
META_PIXEL_ID_SP=123456789
META_ACCESS_TOKEN_SP=EAABwzLixnjYBO...

# GA4
GA4_ENABLED_SP=false
GA4_MEASUREMENT_ID_SP=G-XXXXXXXXXX
GA4_API_SECRET_SP=your_api_secret_here


# ============================================
# SITE 2: SAM DODDS
# ============================================

# Google Ads API
GOOGLE_ADS_ENABLED_SAMDODDS=true
GOOGLE_ADS_CONVERSION_ID_SAMDODDS=AW-XXXXXXXXX
GOOGLE_ADS_PURCHASE_LABEL_SAMDODDS=abc123xyz
GOOGLE_ADS_ADD_TO_CART_LABEL_SAMDODDS=def456uvw
GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_SAMDODDS=ghi789rst
GOOGLE_ADS_DEVELOPER_TOKEN_SAMDODDS=your_developer_token
GOOGLE_ADS_ACCESS_TOKEN_SAMDODDS=your_oauth_access_token

# Meta Ads
META_ADS_ENABLED_SAMDODDS=false
META_PIXEL_ID_SAMDODDS=123456789
META_ACCESS_TOKEN_SAMDODDS=EAABwzLixnjYBO...

# GA4
GA4_ENABLED_SAMDODDS=false
GA4_MEASUREMENT_ID_SAMDODDS=G-XXXXXXXXXX
GA4_API_SECRET_SAMDODDS=your_api_secret_here


# ============================================
# SITE 3: KOPSHOP
# ============================================

# Google Ads API
GOOGLE_ADS_ENABLED_KOPSHOP=true
GOOGLE_ADS_CONVERSION_ID_KOPSHOP=AW-XXXXXXXXX
GOOGLE_ADS_PURCHASE_LABEL_KOPSHOP=abc123xyz
GOOGLE_ADS_ADD_TO_CART_LABEL_KOPSHOP=def456uvw
GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_KOPSHOP=ghi789rst
GOOGLE_ADS_DEVELOPER_TOKEN_KOPSHOP=your_developer_token
GOOGLE_ADS_ACCESS_TOKEN_KOPSHOP=your_oauth_access_token

# Meta Ads
META_ADS_ENABLED_KOPSHOP=false
META_PIXEL_ID_KOPSHOP=123456789
META_ACCESS_TOKEN_KOPSHOP=EAABwzLixnjYBO...

# GA4
GA4_ENABLED_KOPSHOP=false
GA4_MEASUREMENT_ID_KOPSHOP=G-XXXXXXXXXX
GA4_API_SECRET_KOPSHOP=your_api_secret_here


# ============================================
# SITE 6: GAMEDAY
# ============================================

# Google Ads API
GOOGLE_ADS_ENABLED_GAMEDAY=true
GOOGLE_ADS_CONVERSION_ID_GAMEDAY=AW-XXXXXXXXX
GOOGLE_ADS_PURCHASE_LABEL_GAMEDAY=abc123xyz
GOOGLE_ADS_ADD_TO_CART_LABEL_GAMEDAY=def456uvw
GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_GAMEDAY=ghi789rst
GOOGLE_ADS_DEVELOPER_TOKEN_GAMEDAY=your_developer_token
GOOGLE_ADS_ACCESS_TOKEN_GAMEDAY=your_oauth_access_token

# Meta Ads
META_ADS_ENABLED_GAMEDAY=false
META_PIXEL_ID_GAMEDAY=123456789
META_ACCESS_TOKEN_GAMEDAY=EAABwzLixnjYBO...

# GA4
GA4_ENABLED_GAMEDAY=false
GA4_MEASUREMENT_ID_GAMEDAY=G-XXXXXXXXXX
GA4_API_SECRET_GAMEDAY=your_api_secret_here


# ============================================
# SITE 7: SUPPORTERPRYLAR
# ============================================

# Google Ads API
GOOGLE_ADS_ENABLED_SUPPORTERPRYLAR=true
GOOGLE_ADS_CONVERSION_ID_SUPPORTERPRYLAR=AW-XXXXXXXXX
GOOGLE_ADS_PURCHASE_LABEL_SUPPORTERPRYLAR=abc123xyz
GOOGLE_ADS_ADD_TO_CART_LABEL_SUPPORTERPRYLAR=def456uvw
GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_SUPPORTERPRYLAR=ghi789rst
GOOGLE_ADS_DEVELOPER_TOKEN_SUPPORTERPRYLAR=your_developer_token
GOOGLE_ADS_ACCESS_TOKEN_SUPPORTERPRYLAR=your_oauth_access_token

# Meta Ads
META_ADS_ENABLED_SUPPORTERPRYLAR=false
META_PIXEL_ID_SUPPORTERPRYLAR=123456789
META_ACCESS_TOKEN_SUPPORTERPRYLAR=EAABwzLixnjYBO...

# GA4
GA4_ENABLED_SUPPORTERPRYLAR=false
GA4_MEASUREMENT_ID_SUPPORTERPRYLAR=G-XXXXXXXXXX
GA4_API_SECRET_SUPPORTERPRYLAR=your_api_secret_here


# ============================================
# SITE 8: STREETWEEK
# ============================================

# Google Ads API
GOOGLE_ADS_ENABLED_STREETWEEK=true
GOOGLE_ADS_CONVERSION_ID_STREETWEEK=AW-XXXXXXXXX
GOOGLE_ADS_PURCHASE_LABEL_STREETWEEK=abc123xyz
GOOGLE_ADS_ADD_TO_CART_LABEL_STREETWEEK=def456uvw
GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_STREETWEEK=ghi789rst
GOOGLE_ADS_DEVELOPER_TOKEN_STREETWEEK=your_developer_token
GOOGLE_ADS_ACCESS_TOKEN_STREETWEEK=your_oauth_access_token

# Meta Ads
META_ADS_ENABLED_STREETWEEK=false
META_PIXEL_ID_STREETWEEK=123456789
META_ACCESS_TOKEN_STREETWEEK=EAABwzLixnjYBO...

# GA4
GA4_ENABLED_STREETWEEK=false
GA4_MEASUREMENT_ID_STREETWEEK=G-XXXXXXXXXX
GA4_API_SECRET_STREETWEEK=your_api_secret_here


# ============================================
# END OF TRACKING CONFIGURATION
# ============================================
```

---

## 🎯 What to Replace:

| Placeholder | Replace With | Get From |
|-------------|--------------|----------|
| `AW-XXXXXXXXX` | Your Google Ads Conversion ID | Google Ads → Tools → Conversions |
| `abc123xyz` | Purchase conversion label | Google Ads conversion action |
| `def456uvw` | Add to cart label | Google Ads conversion action |
| `ghi789rst` | Begin checkout label | Google Ads conversion action |
| `123456789` | Meta Pixel ID | Meta Events Manager |
| `EAABwzLixnjYBO...` | Meta Access Token | Meta Events Manager → Settings → CAPI |
| `G-XXXXXXXXXX` | GA4 Measurement ID | Google Analytics → Admin → Data Streams |
| `your_api_secret_here` | GA4 API Secret | GA4 → Measurement Protocol |

---

## ✅ Minimum to Start (Google Ads Only):

**For ONE site (e.g., Gameday), add ONLY these 5 lines:**

```bash
GOOGLE_ADS_ENABLED_GAMEDAY=true
GOOGLE_ADS_CONVERSION_ID_GAMEDAY=AW-123456789
GOOGLE_ADS_PURCHASE_LABEL_GAMEDAY=abc123
GOOGLE_ADS_ADD_TO_CART_LABEL_GAMEDAY=def456
GOOGLE_ADS_BEGIN_CHECKOUT_LABEL_GAMEDAY=ghi789
```

**That's it to start! Meta and GA4 can wait.**

---

## 📋 Quick Checklist:

- [ ] Copy all variables above to `.env` file
- [ ] Replace Google Ads credentials (all 6 sites)
- [ ] Leave Meta disabled for now (`META_ADS_ENABLED_*=false`)
- [ ] Leave GA4 disabled for now (`GA4_ENABLED_*=false`)
- [ ] Start server: `npm run dev:gameday`
- [ ] Test: `console.log(window.$track)`
- [ ] Verify: Events fire to GTM + Google Ads

---

**Total Variables: 18 per site × 6 sites = 108 variables**

But start with **JUST Google Ads** (5 vars per site = 30 total) and enable Meta/GA4 later! 🚀

