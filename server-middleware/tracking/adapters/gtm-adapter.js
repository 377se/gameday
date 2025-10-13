/**
 * Google Tag Manager Adapter
 * Handles GTM dataLayer events from server-side
 * 
 * Note: This sends GTM events via client-side dataLayer
 * Server-side GTM would require GTM Server-Side container
 */

/**
 * Map our unified event to GTM format
 */
function mapEventToGTM(event) {
  const gtmEvent = {
    event: mapEventName(event.eventName),
    eventId: event.eventId, // For Meta Pixel eventID parameter
    externalId: event.externalId, // For Meta external_id and Google user_id
  }

  // Add event-specific data based on event type
  switch (event.eventName) {
    case 'view_item':
      gtmEvent.event = 'ViewContent'
      gtmEvent.data = {
        content_name: event.items?.[0]?.name,
        content_category: event.items?.[0]?.category,
        content_ids: event.items?.filter(i => i.id).map(i => String(i.id)) || [],
        content_type: 'product',
        value: event.value,
        currency: event.currency,
        contents: event.items?.filter(i => i.id).map(i => ({
          id: String(i.id),
          quantity: i.quantity || 1,
          item_price: i.price || 0
        })) || []
      }
      break

    case 'view_item_list':
      gtmEvent.event = 'ViewContent'  // Use ViewContent for categories too
      gtmEvent.data = {
        content_name: event.item_list_name,
        content_category: event.item_list_id,
        content_type: 'product_group',  // Distinguish from individual products
        content_ids: [],  // Empty for categories
        currency: event.currency
      }
      break

    case 'add_to_cart':
      gtmEvent.event = 'AddToCart'
      gtmEvent.content = {
        content_name: event.items?.[0]?.name,
        content_category: event.items?.[0]?.category,
        content_ids: event.items?.filter(i => i.id).map(i => String(i.id)) || [],
        content_type: 'product',
        value: event.value,
        currency: event.currency,
        contents: event.items?.filter(i => i.id).map(i => ({
          id: String(i.id),
          quantity: i.quantity || 1,
          item_price: i.price || 0
        })) || []
      }
      break

    case 'begin_checkout':
      gtmEvent.event = 'InitiateCheckout'
      gtmEvent.data = {
        content_ids: event.items?.filter(i => i.id).map(i => String(i.id)) || [],
        content_type: 'product',
        value: event.value,
        currency: event.currency,
        contents: event.items?.filter(i => i.id).map(i => ({
          id: String(i.id),
          quantity: i.quantity || 1,
          item_price: i.price || 0
        })) || [],
        num_items: event.items?.length || 0
      }
      break

    case 'purchase':
      gtmEvent.event = 'purchase'
      gtmEvent.ecommerce = {
        transaction_id: event.transactionId,
        order_id: event.transactionId,
        currency: event.currency,
        value: event.value,
        tax: event.tax,
        shipping: event.shipping,
        items: event.items?.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity
        }))
      }
      break

    case 'page_view':
      gtmEvent.event = 'PageView'
      gtmEvent.data = {
        page_location: event.pageUrl,
        page_title: event.pageTitle,
        page_path: new URL(event.pageUrl).pathname
      }
      break

    default:
      gtmEvent.event = event.eventName
      gtmEvent.data = {
        value: event.value,
        currency: event.currency
      }
  }

  return gtmEvent
}

/**
 * Map unified event names to GTM event names
 */
function mapEventName(eventName) {
  const eventMap = {
    'view_item': 'ViewContent',
    'view_item_list': 'ViewContent',  // Categories also use ViewContent (with content_type: 'product_group')
    'add_to_cart': 'AddToCart',
    'begin_checkout': 'InitiateCheckout',
    'purchase': 'purchase',
    'page_view': 'PageView',
    'login': 'CompleteRegistration',  // Map to Meta standard event
    'contact': 'Contact'  // Map to Meta standard event
  }
  
  return eventMap[eventName] || eventName
}

/**
 * Send event to GTM
 * Returns the formatted event for client-side injection
 */
async function sendEvent(event, config) {
  // Map to GTM format
  const gtmEvent = mapEventToGTM(event)
  
  // Log for server-side visibility
  console.log('[GTM] Event prepared:', JSON.stringify(gtmEvent, null, 2))
  
  // Return the formatted event
  // The client will push this to dataLayer
  return {
    platform: 'gtm',
    event: gtmEvent,
    shouldPushToClient: true // Signal to push to client-side dataLayer
  }
}

module.exports = {
  sendEvent,
  mapEventToGTM,
  mapEventName
}

