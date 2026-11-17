import NotFoundContent from "@/components/not-found-content"

// No route params here. Reading headers() for the locale would make every
// route dynamic, so the locale is read from the URL on the client.
const NotFound = () => <NotFoundContent />

export default NotFound
