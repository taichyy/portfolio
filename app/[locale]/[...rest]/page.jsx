import { notFound } from "next/navigation"

// Sends unmatched paths to the localised not-found.jsx.
const CatchAll = () => notFound()

export default CatchAll
