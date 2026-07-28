import { notFound } from "next/navigation"

// Unmatched paths under a locale land here rather than on the unstyled global
// 404, so they get a real 404 status plus the localised not-found.jsx above.
const CatchAll = () => notFound()

export default CatchAll
