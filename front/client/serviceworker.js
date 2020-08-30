const staticDevCoffee = "budApp-v1"
const assets = [
  "/",
  "./index.html",
  "./styles/styles.css",
  "",
  "./images/bud.png",
  
]


self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})



