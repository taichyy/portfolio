"use client"

import Image from "next/image"
import { useState } from "react"

import Lightbox from "./lightbox"
import { CONTENT_SIZES } from "./gallery"
import { useI18n } from "@/components/providers/i18n-provider"

const ZoomableImage = (props) => {
    const { src, alt } = props;
    const { dict } = useI18n()
    const [open, setOpen] = useState(false)

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="block w-full cursor-zoom-in overflow-hidden border border-line transition-opacity hover:opacity-90"
                aria-label={dict.project.zoomImage}
            >
                <Image src={src} alt={alt} width={1000} height={700} sizes={CONTENT_SIZES} className="w-full" />
            </button>
            <Lightbox open={open} onOpenChange={setOpen} images={[{ src, alt }]} title={alt} />
        </>
    )
}

export default ZoomableImage
